import { TransportationFullFragment } from '~/graphql/generated/graphql';
import DropDownSelect from '../DropDownSelect';
import { DropDownItem } from '../DropDownSelect/DropDownSelect';

const transportationOptions: DropDownItem[] = [
  {
    val: 'Plane',
    view: (
      <div className="flex items-center justify-between gap-2">
        <span>Place</span> <i className="fa-solid fa-plane"></i>
      </div>
    ),
  },
  {
    val: 'Car',
    view: (
      <div className="flex items-center justify-between gap-2">
        <span>Car</span> <i className="fa-solid fa-car"></i>
      </div>
    ),
  },
];

interface TransportationListProps {
  transportation: TransportationFullFragment[];
}

const TransportationList = ({ transportation }: TransportationListProps) => {
  return (
    <ul>
      {transportation.map((transport, i) => (
        <li>
          <div className="flex items-center justify-between">
            <div className="grow basis-0 text-left">
              <div className="font-semibold">
                {transport.departure_location}
              </div>
              <div className="text-sm">Feb 1</div>
            </div>
            <DropDownSelect
              placeholder="transportation"
              onSelect={(selection: DropDownItem) => console.log(selection)}
              options={transportationOptions}
            />
            <div className="grow basis-0 text-right">
              <div className="font-semibold">{transport.arrival_location}</div>
              <div className="text-sm">Feb 1</div>
            </div>
          </div>

          <div className="flex w-full items-end gap-4 bg-transparent">
            <textarea
              className="relative w-full rounded-lg bg-transparent p-1 py-1 text-sm text-grayPrimary outline-none hover:bg-grayPrimary/20"
              placeholder="notes..."
              rows={3}
            />
            <button>
              <i className="fa-solid fa-paperclip"></i>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TransportationList;
