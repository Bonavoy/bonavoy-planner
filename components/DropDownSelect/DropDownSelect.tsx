import { useState, ReactNode, useEffect } from 'react';

export interface DropDownItem {
  val: string;
  view: ReactNode;
}

interface DropDownSelectInterface {
  onSelect: (selection: DropDownItem) => void;
  placeholder: string;
  options: DropDownItem[];
}

const DropDownSelect = ({
  onSelect,
  options,
  placeholder,
}: DropDownSelectInterface) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DropDownItem | null>(null);

  useEffect(() => {}, []);

  const toggleDropdown = () => setShowDropDown(!showDropDown);

  return (
    <div
      id="dropDownSelect"
      className="relative h-min cursor-pointer select-none rounded-lg border border-white text-sm duration-100 hover:border-grayPrimary hover:shadow-md"
    >
      <div onClick={toggleDropdown} className="group relative px-2 py-1">
        {selectedItem ? selectedItem?.val : placeholder}
        <i className="fa-solid fa-caret-down pl-2 text-white duration-100 group-hover:text-black" />
      </div>
      {showDropDown ? (
        <div className="absolute z-10 w-fit pt-1">
          <ul className="rounded-lg border border-grayPrimary bg-white shadow-md">
            {options.map((option, i) => (
              <li
                className="px-2 py-1 hover:bg-grayPrimary/10"
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
