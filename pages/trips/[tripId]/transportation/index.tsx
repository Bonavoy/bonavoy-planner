import { useQuery, useSubscription } from '@apollo/client';
import type { GetServerSidePropsContext } from 'next';

import Planner from '~/layouts/Planner';
import TransportationMap from '~/components/RouteMap/RouteMap';
import { GET_PLACES } from '~/graphql/queries/place';
import TransportationList from '~/components/TransportationList/TransportationList';
import { TRANSPORTATION_UPDATED } from '~/graphql/subscriptions/transportation';
import { TRANSPORTATION_FULL } from '~/graphql/fragments/transportation';
import { cloneDeep } from '@apollo/client/utilities';

interface TransportationProps {
  tripId: string;
  placeId: string | null;
}

export default function Transportation({
  tripId,
  placeId,
}: TransportationProps) {
  const { data: getPlacesQuery } = useQuery(GET_PLACES, {
    variables: { tripId },
  });

  useSubscription(TRANSPORTATION_UPDATED, {
    skip: !getPlacesQuery?.places,
    variables: {
      placeIds: getPlacesQuery?.places.map((place) => place.id) ?? [],
    },
    onData: ({ data, client }) => {
      const transportationNotification = data.data?.transportation;
      if (!transportationNotification) return;

      const { deleted, transportation, placeId } = transportationNotification;

      const placesQuery = client.readQuery({
        query: GET_PLACES,
        variables: { tripId: tripId },
      });

      if (!placesQuery?.places) return;

      const newPlaces = cloneDeep(placesQuery);

      // deletion
      if (deleted) {
        for (let place of newPlaces.places) {
          place.transportation = place.transportation.filter(
            (transp) => transportation.id !== transp.id,
          );
        }
        client.writeQuery({ query: GET_PLACES, id: tripId, data: newPlaces });
        return;
      }

      const newTransportation = {
        id: transportation.id,
        type: transportation.type,
        departure_location: transportation.departure_location,
        arrival_location: transportation.arrival_location,
        departure_time: transportation.departure_time ?? null,
        arrival_time: transportation.arrival_time ?? null,
        details: transportation.details,
        arrivalCoords: transportation.arrivalCoords ?? null,
        departureCoords: transportation.departureCoords ?? null,
      };
      if (placeId) {
        for (let place of newPlaces.places) {
          if (place.id === placeId) {
            const transportationToUpdate = place.transportation.find(
              (transp) => transp.id === transportation.id,
            );
            // update
            if (transportationToUpdate) {
              client.writeFragment({
                id: `Transportation:${transportation.id}`,
                fragment: TRANSPORTATION_FULL,
                data: newTransportation,
              });
              // create
            } else {
              place.transportation.push(newTransportation);
              client.writeQuery({
                query: GET_PLACES,
                id: tripId,
                data: newPlaces,
              });
            }
          }
        }
      }
    },
  });

  return (
    <main className="h-screen">
      <Planner mode="transportation" tripId={tripId} placeId={placeId}>
        <section className="grid flex-grow grid-cols-2 overflow-hidden bg-white">
          <div className="overflow-auto px-12 py-8">
            {getPlacesQuery?.places.map((place, i) => {
              if (i < getPlacesQuery?.places.length - 1) {
                return (
                  <div className="pb-8" key={i}>
                    <div className="flex items-center justify-center gap-2 pb-2">
                      {/* departure place */}
                      <div className="flex flex-1 justify-center">
                        <div className="flex flex-col items-center">
                          <div className="text-xs text-grayTertiary">
                            Departing from:
                          </div>
                          <div className="cursor-pointer font-heading text-2xl font-bold duration-100 hover:underline">
                            {place.place_name}
                          </div>
                          <div className="font-heading text-sm font-medium text-grayPrimary duration-100">
                            Feb 1
                          </div>
                        </div>
                      </div>

                      <div className="shrink text-graySecondary">
                        <i className="fa-regular fa-arrow-right" />
                      </div>

                      {/* arrival place */}
                      <div className="flex flex-1 justify-center">
                        <div className="flex flex-col items-center">
                          <div className="text-xs text-grayTertiary">
                            Arriving at:
                          </div>
                          <div className="cursor-pointer font-heading text-2xl font-bold duration-100 hover:underline">
                            {getPlacesQuery.places[i + 1].place_name}
                          </div>
                          <div className="font-heading text-sm font-medium text-grayPrimary duration-100">
                            Feb 1
                          </div>
                        </div>
                      </div>
                    </div>
                    <TransportationList
                      transportation={place.transportation}
                      placeId={place.id}
                      tripId={tripId}
                    />
                  </div>
                );
              }
            })}
          </div>
          <TransportationMap places={getPlacesQuery?.places ?? []} />
        </section>
      </Planner>
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      tripId: context.params?.tripId,
      placeId: context.query?.placeId ?? null,
    },
  };
}
