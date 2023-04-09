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
  const [selectedItem, setSelectedItem] = useState<DropDownItem>(value);

  useEffect(() => {}, []);

  const toggleDropdown = () => setShowDropDown(!showDropDown);

  return (
    <div
      id="dropDownSelect"
      className="group relative flex h-8 w-8 cursor-pointer select-none items-center justify-center rounded-full bg-surface duration-100 hover:border-surface  hover:bg-primary hover:shadow-md"
    >
      <div
        onClick={toggleDropdown}
        className="relative flex items-center py-1 text-grayPrimary duration-100 group-hover:text-white"
      >
        {selectedItem ? selectedItem?.view : placeholder}
      </div>
      {showDropDown ? (
        <div className="absolute z-10 w-fit pt-1">
          <ul className="rounded-lg border border-grayPrimary bg-white shadow-md">
            {options.map((option, i) => (
              <li
                className="px-2 py-1 text-grayPrimary hover:bg-grayPrimary/10"
                key={i}
                onClick={() => {
                  setSelectedItem(option);
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
