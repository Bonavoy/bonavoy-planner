import {
  TransportationFullFragment,
  TransportationType,
} from '~/graphql/generated/graphql';
import { useMutation } from '@apollo/client';
import { ADD_TRANSPORTATION } from '~/graphql/mutations/transportation';
import { GET_PLACES } from '~/graphql/queries/place';
import { cloneDeep } from '@apollo/client/utilities';
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
          arrival_location: '',
          departure_location: '',
          details: '',
          type: TransportationType.Plane,
        },
      },
      update: (cache, { data }) => {
        const placesQuery = cache.readQuery({
          query: GET_PLACES,
          variables: { tripId: tripId },
        });

        const newPlaces = cloneDeep(placesQuery);

        const place = newPlaces?.places.find((place) => place.id === placeId);
        if (data?.addTransportation) {
          place!.transportation = [
            ...place!.transportation,
            data!.addTransportation,
          ];
        }

        cache.writeQuery({ query: GET_PLACES, id: tripId, data: newPlaces });
      },
      optimisticResponse: {
        addTransportation: {
          id: 'temp-id',
          arrival_location: '',
          departure_location: '',
          details: '',
          type: TransportationType.Plane,
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
                transportationId={transport.id}
                transport={transport}
              />
            </li>
          ))
        ) : (
          <div className="w-full py-4 text-center text-grayPrimary">
            I hope you're not walking (add how you're gonna get to the next
            location here)
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
