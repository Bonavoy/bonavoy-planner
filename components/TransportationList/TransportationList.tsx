import { useMutation } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';

import {
  ADD_TRANSPORTATION,
  DELETE_TRANSPORTATION,
} from '~/graphql/mutations/transportation';
import { GET_PLACES } from '~/graphql/queries/place';
import { cloneDeep } from '@apollo/client/utilities';
import {
  TransportationFullFragment,
  TransportationType,
} from '~/graphql/generated/graphql';
import ConnectingTransportation from './ConnectingTransportation';
import DropDownSelect, { DropDownItem } from '../DropDownSelect';
interface TransportationListProps {
  transportation: TransportationFullFragment[][];
  tripId: string;
  placeId: string;
}

const transportationOptions: DropDownItem[] = [
  {
    val: TransportationType.Plane,
    view: (
      <div className="flex items-center justify-start gap-2 px-2 text-xs">
        <i className="fa-solid fa-plane"></i>
        <span>Add flight</span>
      </div>
    ),
  },
  {
    val: TransportationType.Car,
    view: (
      <div className="flex items-center justify-start gap-2 px-2 text-xs">
        <i className="fa-solid fa-car"></i>
        <span>Add car ride</span>
      </div>
    ),
  },
];

const TransportationList = ({
  transportation,
  placeId,
  tripId,
}: TransportationListProps) => {
  const [addTransportationMutation] = useMutation(ADD_TRANSPORTATION);

  const addTransportation = (
    connectingId: string,
    order: number,
    connectingOrder: number,
    type: TransportationType,
  ) => {
    const id = uuidv4();
    addTransportationMutation({
      variables: {
        placeId,
        transportation: {
          id,
          arrivalLocation: '',
          departureLocation: '',
          details: '',
          type,
          connectingId,
          order,
        },
      },
      update: (cache, { data }) => {
        if (!data) return;

        const placesQuery = cache.readQuery({
          query: GET_PLACES,
          variables: { tripId: tripId },
        });

        const newPlaces = cloneDeep(placesQuery);
        if (!newPlaces) return;

        const place = newPlaces.places.find((place) => place.id === placeId);
        if (!place) return;

        const connections = place.transportation.find(
          (connections) =>
            connections[0].connectingId === data.addTransportation.connectingId,
        );
        if (!connections) {
          place.transportation.push([data.addTransportation]);
        } else {
          connections.push(data.addTransportation);
        }

        cache.writeQuery({ query: GET_PLACES, id: tripId, data: newPlaces });
      },
      optimisticResponse: {
        addTransportation: {
          __typename: 'Transportation',
          id,
          arrivalLocation: '',
          departureLocation: '',
          details: '',
          type,
          departureTime: null,
          arrivalTime: null,
          departureCoords: null,
          arrivalCoords: null,
          connectingOrder,
          connectingId,
          order,
        },
      },
    });
  };

  return (
    <>
      <ul>
        {transportation.length ? (
          transportation.map((connectingTransportation, order) => (
            <li className="pb-3 last:pb-0" key={connectingTransportation[0].id}>
              <ConnectingTransportation
                connectingTransportation={connectingTransportation}
                tripId={tripId}
                order={order}
                addConnectingTransportation={addTransportation}
              />
            </li>
          ))
        ) : (
          <div className="w-full py-4 text-center text-xs text-gray-300">
            I hope you&apos;re not walking (add how you&apos;re gonna get
            between these 2 locations above)
          </div>
        )}
      </ul>
      <div className="py-3">
        <DropDownSelect
          onSelect={(selection: DropDownItem) => {
            addTransportation(
              uuidv4(),
              transportation.length,
              0,
              selection.val,
            );
          }}
          options={transportationOptions}
          className="w-full rounded-sm text-xs text-gray-500 duration-100 hover:bg-surface"
        >
          Add transportation
        </DropDownSelect>
      </div>
    </>
  );
};

export default TransportationList;
