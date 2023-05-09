import { useState, ReactNode } from 'react';

export interface DropDownItem {
  val: any;
  view: ReactNode;
}

interface DropDownSelectInterface {
  onSelect: (selection: DropDownItem) => void;
  options: DropDownItem[];
  children: ReactNode;
}

const DropDownSelect = ({
  onSelect,
  options,
  children,
}: DropDownSelectInterface) => {
  const [showDropDown, setShowDropDown] = useState(false);

  const toggleDropdown = () => setShowDropDown(!showDropDown);

  return (
    <button
      type="button"
      id="dropDownSelect"
      onClick={toggleDropdown}
      className="relative flex w-full cursor-pointer select-none items-center justify-center rounded-md bg-primary text-white duration-100"
    >
      <div className="relative flex items-center py-1 text-xs duration-100">
        {children}
      </div>
      {showDropDown ? (
        <div className="absolute top-full w-fit pt-1 text-black">
          <ul className="rounded-md bg-white shadow-centered">
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
    </button>
  );
};

export default DropDownSelect;
