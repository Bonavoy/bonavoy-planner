import { useState, ReactNode, useEffect } from 'react';
import { TransportationType } from '~/graphql/generated/graphql';

export interface DropDownItem {
  val: TransportationType;
  view: ReactNode;
}

interface DropDownSelectInterface {
  onSelect: (selection: DropDownItem) => void;
  placeholder: string;
  options: DropDownItem[];
  value: DropDownItem;
}

const DropDownSelect = ({
  onSelect,
  options,
  placeholder,
  value,
}: DropDownSelectInterface) => {
  const [showDropDown, setShowDropDown] = useState(false);

  useEffect(() => {}, []);

  const toggleDropdown = () => setShowDropDown(!showDropDown);

  return (
    <button
      id="dropDownSelect"
      onClick={toggleDropdown}
      className="group relative flex h-6 w-6 cursor-pointer select-none items-center justify-center rounded-md duration-100  hover:bg-surface"
    >
      <div className="relative flex items-center py-1 text-sm duration-100">
        {value ? value.view : placeholder}
      </div>
      {showDropDown ? (
        <div className="absolute top-full w-fit pt-1">
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
