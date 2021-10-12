import React, { useEffect, useRef, useState } from "react";
import values from "lodash/values";
import classNames from "classnames";
import SelectEventHandler from "./SelectEventHandler";
import SelectOptions from "./SelectOptions";
import { useClickOutsideState } from "../../hooks";
import './styles.scss';

const Select = ({ value, options, size, onChange }) => {
  const selectRef = useRef(null);
  // Custom hook
  const [isOpen, setIsOpen] = useClickOutsideState(selectRef);

  useEffect(() => {
    // get the selected option by its className
    const selectedElement = selectRef.current.querySelector("li.selected");
    if (isOpen && selectedElement) selectedElement.focus();
  }, [isOpen, selectRef]);

  const handleClick = () => {
    setIsOpen(!isOpen);
    selectRef.current.focus();
  };

  const handleChange = (key) => {
    onChange(key);
    handleClick();
  };

  const selected = options[value] || values(options)[0];

  return (
    <SelectEventHandler
      className="Select"
      selectRef={selectRef}
      options={options}
      value={value}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onChange={handleChange}
      onClick={handleClick}
      size={size}
      tabIndex="0"
    >
      <div
        className={classNames("selection", { open: isOpen })}
        onClick={handleClick}
      >
        {selected}
      </div>
      <SelectOptions
        items={options}
        selected={value}
        onChange={handleChange}
        isOpen={isOpen}
        size={size}
      />
    </SelectEventHandler>
  );
};

export default Select;
