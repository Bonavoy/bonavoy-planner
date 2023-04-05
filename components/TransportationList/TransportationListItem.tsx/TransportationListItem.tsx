import {
  TransportationFullFragment,
  TransportationType,
} from '~/graphql/generated/graphql';
import { useState } from 'react';
import DropDownSelect from '~/components/DropDownSelect';
import type { DropDownItem } from '~/components/DropDownSelect';
import { useMutation } from '@apollo/client';
import { UPDATE_TRANSPORTATION } from '~/graphql/mutations/transportation';
import LocationSearch from '../LocationSearch';

const transportationOptions: DropDownItem[] = [
  {
    val: TransportationType.Plane,
    view: (
      <div className="flex items-center justify-between gap-2">
        <i className="fa-solid fa-plane"></i> <span>Plane</span>
      </div>
    ),
  },
  {
    val: TransportationType.Car,
    view: (
      <div className="flex items-center justify-between gap-2">
        <i className="fa-solid fa-car"></i> <span>Car</span>
      </div>
    ),
  },
];

interface UpdateTransportationInput {
  arrival_location?: string;
  arrival_time?: Date;
  departure_location?: string;
  departure_time?: Date;
  details?: string;
  type?: TransportationType;
}

interface TransportationListItemProps {
  transportationId: string;
  transport: TransportationFullFragment;
}

const TransportationListItem = ({
  transportationId,
  transport,
}: TransportationListItemProps) => {
  const [departureLocation, setDepartureLocation] = useState(
    transport.departure_location,
  );
  const [arrivalLocation, setArrivalLocation] = useState(
    transport.arrival_location,
  );
  const [transportationDetails, setDetails] = useState(transport.details);
  const [type, setType] = useState<TransportationType>(transport.type);
  const [updateTransportationMutation] = useMutation(UPDATE_TRANSPORTATION);

  const updateTransportation = (transportation: UpdateTransportationInput) => {
    updateTransportationMutation({
      variables: {
        id: transportationId,
        transportation,
      },
    });
  };

  return (
    <div className="pb-2">
      <div className="transform cursor-pointer rounded-xl border border-grayTertiary px-4 py-2 duration-200 hover:shadow-lg">
        <div className="w-fit pb-1">
          <DropDownSelect
            placeholder="travel options"
            onSelect={(selection: DropDownItem) => {
              updateTransportation({ type: selection.val });
            }}
            options={transportationOptions}
            defaultValue={
              transportationOptions.find(
                (transportation) => transportation.val === transport.type,
              )!
            }
          />
        </div>

        <div className="pb-1">
          <div className="flex items-center gap-2 rounded-lg border border-grayTertiary px-2">
            <LocationSearch
              value={departureLocation}
              updateLocation={(location) =>
                updateTransportation({ departure_location: location })
              }
            />
            <div className="flex items-center justify-start gap-1 py-1 text-sm">
              Feb 1
              <button>
                <i className="fa fa-calendar cursor" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="pb-1">
          <div className="flex items-center gap-2 rounded-lg border border-grayTertiary px-2">
            <LocationSearch
              value={arrivalLocation}
              updateLocation={(location) =>
                updateTransportation({ arrival_location: location })
              }
            />
            <div className="flex items-center justify-end gap-1 py-1 text-sm">
              Feb 1
              <button>
                <i className="fa fa-calendar cursor" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>

        {/* <textarea
        className="relative w-full rounded-lg bg-transparent text-sm text-grayPrimary outline-none"
        placeholder="details..."
        onChange={(e) => setDetails(e.target.value)}
        rows={3}
      /> */}
        <div className="flex w-full justify-end gap-4 bg-transparent">
          <button>
            <i className="fa-solid fa-paperclip text-grayPrimary"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransportationListItem;
