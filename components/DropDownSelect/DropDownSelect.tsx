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
  defaultValue: DropDownItem;
}

const DropDownSelect = ({
  onSelect,
  options,
  placeholder,
  defaultValue,
}: DropDownSelectInterface) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DropDownItem | null>(
    defaultValue,
  );

  useEffect(() => {}, []);

  const toggleDropdown = () => setShowDropDown(!showDropDown);

  return (
    <div
      id="dropDownSelect"
      className="relative h-min cursor-pointer select-none rounded-lg border border-white text-sm duration-100 hover:border-surface hover:shadow-md"
    >
      <div
        onClick={toggleDropdown}
        className="group relative flex items-center py-1 text-grayPrimary duration-100 hover:px-2"
      >
        {selectedItem ? selectedItem?.view : placeholder}
        <i className="fa-solid fa-caret-down pl-2 text-white duration-100 group-hover:text-black" />
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
