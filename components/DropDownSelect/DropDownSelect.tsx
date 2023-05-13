import { useState, ReactNode, useRef, useEffect } from 'react';

export interface DropDownItem {
  val: any;
  view: ReactNode;
}

interface DropDownSelectInterface {
  onSelect: (selection: DropDownItem) => void;
  options: DropDownItem[];
  children: ReactNode;
  className?: string;
}

const DropDownSelect = ({
  onSelect,
  options,
  children,
  className,
}: DropDownSelectInterface) => {
  const [showDropDown, setShowDropDown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close the menu when the user clicks outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropDown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDropdown = () => setShowDropDown(!showDropDown);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        id="dropDownSelect"
        onClick={toggleDropdown}
        className={`${className} relative flex cursor-pointer select-none items-center justify-center text-black`}
      >
        <div className="relative flex items-center py-1 text-xs">
          {children}
        </div>
      </button>

      {showDropDown ? (
        <div className="absolute top-full z-10 w-fit cursor-pointer pt-1 text-black">
          <ul className="rounded-md bg-white py-1 shadow-centered">
            {options.map((option, i) => (
              <li
                className="px-1 py-1 hover:bg-surface"
                key={i}
                onClick={() => {
                  onSelect(option);
                  toggleDropdown();
                }}
              >
                {option.view}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default DropDownSelect;
