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
import TransportationListItem from './TransportationListItem.tsx';
import ConnectingTransportation from './ConnectingTransportation';
interface TransportationListProps {
  transportation: TransportationFullFragment[][];
  tripId: string;
  placeId: string;
}

const TransportationList = ({
  transportation,
  placeId,
  tripId,
}: TransportationListProps) => {
  const [addTransportationMutation] = useMutation(ADD_TRANSPORTATION);

  const addTransportation = () => {
    const id = uuidv4();
    const connectingId = uuidv4();
    addTransportationMutation({
      variables: {
        placeId,
        transportation: {
          id,
          arrivalLocation: '',
          departureLocation: '',
          details: '',
          type: TransportationType.Plane,
          connectingId,
          order: transportation.length,
        },
      },
      update: (cache, { data }) => {
        if (!data) return;

        const placesQuery = cache.readQuery({
          query: GET_PLACES,
          variables: { tripId: tripId },
        });

        const newPlaces = cloneDeep(placesQuery);

        const place = newPlaces?.places.find((place) => place.id === placeId);
        place!.transportation = [
          ...place!.transportation,
          [data.addTransportation],
        ];

        cache.writeQuery({ query: GET_PLACES, id: tripId, data: newPlaces });
      },
      optimisticResponse: {
        addTransportation: {
          __typename: 'Transportation',
          id,
          arrivalLocation: '',
          departureLocation: '',
          details: '',
          type: TransportationType.Plane,
          departureTime: null,
          arrivalTime: null,
          departureCoords: null,
          arrivalCoords: null,
          order: transportation.length,
          connectingId,
          connectingOrder: 0,
        },
      },
    });
  };

  return (
    <>
      <ul>
        {transportation.length ? (
          transportation.map((connectingTransportation) => (
            <li className="pb-1.5" key={connectingTransportation[0].id}>
              <ConnectingTransportation
                connectingTransportation={connectingTransportation}
                tripId={tripId}
              />
            </li>
          ))
        ) : (
          <div className="w-full py-4 text-center text-grayPrimary">
            I hope you&apos;re not walking (add how you&apos;re gonna get to the
            next location here)
          </div>
        )}
      </ul>
      <button
        className="w-full rounded-md bg-primary py-1 text-sm text-white opacity-0 duration-100 hover:opacity-100"
        onClick={addTransportation}
      >
        Add transportation
      </button>
    </>
  );
};

export default TransportationList;
