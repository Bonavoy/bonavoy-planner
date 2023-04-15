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
interface TransportationListProps {
  transportation: TransportationFullFragment[];
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
    addTransportationMutation({
      variables: {
        placeId,
        transportation: {
          arrivalLocation: '',
          departureLocation: '',
          details: '',
          type: TransportationType.Plane,
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
          data.addTransportation,
        ];

        cache.writeQuery({ query: GET_PLACES, id: tripId, data: newPlaces });
      },
      optimisticResponse: {
        addTransportation: {
          __typename: 'Transportation',
          id: uuidv4(),
          arrivalLocation: '',
          departureLocation: '',
          details: '',
          type: TransportationType.Plane,
          departureTime: null,
          arrivalTime: null,
          departureCoords: null,
          arrivalCoords: null,
          order: transportation.length,
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
              <TransportationListItem
                tripId={tripId}
                transportationId={transport.id}
                transport={transport}
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
        className="w-full rounded-lg bg-primary py-1 text-sm text-white"
        onClick={addTransportation}
      >
        Add transportation
      </button>
    </>
  );
};

export default TransportationList;
