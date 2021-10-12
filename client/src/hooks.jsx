import { useEffect, useState } from "react";

const useClickOutsideState = (elementRef) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!isOpen) return;

      const isOutsideClick =
        elementRef.current && !elementRef.current.contains(e.target);
      if (isOutsideClick) setIsOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, elementRef]);

  return [isOpen, setIsOpen];
};

export { useClickOutsideState };
