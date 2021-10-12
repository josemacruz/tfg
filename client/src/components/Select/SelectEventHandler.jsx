const SelectEventHandler = ({
  selectRef,
  options,
  value,
  size,
  isOpen,
  setIsOpen,
  onClick,
  onChange,
  className,
  children,
  ...props
}) => {
  const handleKeyDown = (e) => {
    // handles all relevant key presses made on the select and options components
    const { keyCode } = e;
    switch (keyCode) {
      case 38: // UP arrow key
      case 87: // W key
        // If UP or W are pressed, then go one option up the list
        e.preventDefault();
        handleMoveTo(-1);
        break;
      case 40: // DOWN arrow key
      case 83: // S key
        // If DOWN or S are pressed, then go one option down the list
        e.preventDefault();
        handleMoveTo(1);
        break;
      case 13: // ENTER
      case 32: // SPACE
        e.preventDefault();
        // If ENTER or SPACE are pressed, then select the currently focused option
        handleSelectFocusedElement(document.activeElement);
        break;
      case 27: // ESC
        // If ESCAPE is pressed, close the options dropdown
        e.preventDefault();
        setIsOpen(false);
        break;
      default:
        return;
    }
  };

  const handleMoveTo = (direction) => {
    // handles the nex focused option based on the current one
    if (!isOpen) {
      onClick();
      return;
    }
    const parentElement = selectRef.current;
    const activeElement = document.activeElement;
    // selectedValue can be the currently focused option
    // (TAB-related, you will see the browser's default outline in this case)
    // or the currently selected option if nothing is focused.
    // "parentElement.contains(activeElement)" makes sure to only count for
    // a focused option if the element is a part of the select component.
    const selectedValue =
      activeElement && parentElement.contains(activeElement)
        ? activeElement.getAttribute("value")
        : value;
    if (!selectedValue) return;

    const optionsList = Object.keys(options);
    // nextIndex will cycle through 0 to optionsList.length - 1
    // as you use the mouse wheel or UP/DOWN W/S keys
    let nextIndex =
      (optionsList.indexOf(selectedValue) + direction) % optionsList.length;
    if (nextIndex < 0) {
      nextIndex = optionsList.length - 1;
    }

    // find DOM element that matches the selected option
    const nextElement = parentElement.querySelector(
      `li[value="${optionsList[nextIndex]}"]`
    );
    // this activates the browser's focus outline for the nextElement
    // so when you press ENTER or SPACE, it will close the options
    // and select the focused option
    nextElement.focus();
  };

  const handleSelectFocusedElement = (activeElement) => {
    // handles the selection of the currently focused option
    if (!isOpen || !activeElement) {
      // if the dropdown is closed or nothing is selected,
      // then use this action to open the dropdown
      onClick();
      return;
    }

    const parentElement = selectRef.current;
    // makes sure the active element is a part of the select component
    if (!parentElement.contains(activeElement)) return;
    // if yes, select that element
    onChange(activeElement.getAttribute("value"));
  };

  const handleWheel = (e) => {
    // handles the mouse wheel events
    if (
      size > 0 ||
      !isOpen ||
      !document.activeElement ||
      !selectRef.current.contains(document.activeElement)
    )
      // size must be 0 for the wheel to work,
      // otherwise it will interfere with the internal options scroll
      // this event is also ignore if the dropdown is closed or nothing is focused
      // or if the currently focused element is not a part of the select component
      return;

    // converts deltaY (positive if you move the wheel down, negative if up)
    // to values handleMoveTo can understand
    // this way, it will be like using the UP/DOWN W/S keys
    handleMoveTo(e.deltaY < 0 ? -1 : 1);
  };

  return (
    <div
      onWheel={handleWheel}
      onKeyDown={handleKeyDown}
      className={className}
      ref={selectRef}
      {...props}
    >
      {children}
    </div>
  );
};

export default SelectEventHandler;
