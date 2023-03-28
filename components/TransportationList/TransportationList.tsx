import {
  TransportationFullFragment,
  TransportationType,
} from '~/graphql/generated/graphql';
import DropDownSelect from '../DropDownSelect';
import { DropDownItem } from '../DropDownSelect/DropDownSelect';
import { useMutation } from '@apollo/client';
import { ADD_TRANSPORTATION } from '~/graphql/mutations/transportation';

const transportationOptions: DropDownItem[] = [
  {
    val: 'PLANE',
    view: (
      <div className="flex items-center justify-between gap-2">
        <span>Plane</span> <i className="fa-solid fa-plane"></i>
      </div>
    ),
  },
  {
    val: 'CAR',
    view: (
      <div className="flex items-center justify-between gap-2">
        <span>Car</span> <i className="fa-solid fa-car"></i>
      </div>
    ),
  },
];

interface TransportationListProps {
  transportation: TransportationFullFragment[];
  placeId: string;
}

const TransportationList = ({
  transportation,
  placeId,
}: TransportationListProps) => {
  const [addTransportationMutation] = useMutation(ADD_TRANSPORTATION);

  const addTransportation = () => {
    addTransportationMutation({
      variables: {
        placeId,
        transportation: {
          arrival_location: '',
          departure_location: '',
          details: '',
          type: TransportationType.Car,
        },
      },
    });
  };

  return (
    <>
      <ul>
        {transportation.length ? (
          transportation.map((transport, i) => (
            <li className="pb-1" key={i}>
              <div className="rounded-lg border border-grayPrimary px-4 py-2">
                <div className="flex items-center justify-between">
                  <div className="grow basis-0">
                    <input
                      placeholder="departure location"
                      className="transform rounded-md text-left font-semibold outline-none duration-300 ease-in-out focus:bg-surface focus:px-2 focus:shadow-md	"
                      value={transport.departure_location}
                    />
                    <div className="flex items-center justify-start gap-1 py-1 text-sm">
                      Feb 1
                      <button>
                        <i
                          className="fa fa-calendar cursor"
                          aria-hidden="true"
                        ></i>
                      </button>
                    </div>
                  </div>
                  <DropDownSelect
                    placeholder="transportation"
                    onSelect={(selection: DropDownItem) =>
                      console.log(selection)
                    }
                    options={transportationOptions}
                  />
                  <div className="grow basis-0 text-right">
                    <input
                      placeholder="arrival location"
                      className="transform-all rounded-md text-right font-semibold outline-none duration-300 ease-in-out focus:bg-surface focus:px-2 focus:text-left focus:shadow-md	"
                      value={transport.arrival_location}
                    />
                    <div className="flex items-center justify-end gap-1 py-1 text-sm">
                      Feb 1
                      <button>
                        <i
                          className="fa fa-calendar cursor"
                          aria-hidden="true"
                        ></i>
                      </button>
                    </div>
                  </div>
                </div>

                <textarea
                  className="relative w-full rounded-lg bg-transparent text-sm text-grayPrimary outline-none"
                  placeholder="details..."
                  rows={3}
                />
                <div className="flex w-full justify-end gap-4 bg-transparent">
                  <button>
                    <i className="fa-solid fa-paperclip text-grayPrimary"></i>
                  </button>
                </div>
              </div>
            </li>
          ))
        ) : (
          <div className="w-full py-4 text-center text-grayPrimary">
            How exactly are you gonna get between these two places...?
          </div>
        )}
      </ul>
      <button
        className="w-full rounded-lg bg-primary py-1 text-sm text-white"
        onClick={addTransportation}
      >
        Add transportation
      </button>
    </>
  );
};

export default TransportationList;
