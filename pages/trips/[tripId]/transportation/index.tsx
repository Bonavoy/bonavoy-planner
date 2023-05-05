import { useQuery, useSubscription } from '@apollo/client';
import type { GetServerSidePropsContext } from 'next';

import Planner from '~/layouts/Planner';
import TransportationMap from '~/components/RouteMap/RouteMap';
import { GET_PLACES } from '~/graphql/queries/place';
import TransportationList from '~/components/TransportationList/TransportationList';
import { TRANSPORTATION_UPDATED } from '~/graphql/subscriptions/transportation';
import { TRANSPORTATION_FULL } from '~/graphql/fragments/transportation';
import { cloneDeep } from '@apollo/client/utilities';
import { Transportation } from '~/graphql/generated/graphql';
import ActiveElementsProvider from '~/components/ActiveElementsProvider';

interface TransportationProps {
  tripId: string;
  placeId: string | null;
}

export default function TransportationPage({
  tripId,
  placeId,
}: TransportationProps) {
  const getPlacesQuery = useQuery(GET_PLACES, {
    variables: { tripId },
  });

  useSubscription(TRANSPORTATION_UPDATED, {
    skip: !getPlacesQuery.data?.places,
    variables: {
      placeIds: getPlacesQuery.data?.places.map((place) => place.id) ?? [],
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
          place.transportation[
            transportationNotification.transportation.order
          ] = place.transportation[
            transportationNotification.transportation.order
          ].filter((transp) => transportation.id !== transp.id);
        }
        client.writeQuery({ query: GET_PLACES, id: tripId, data: newPlaces });
        return;
      }

      const newTransportation: Transportation = {
        __typename: 'Transportation',
        id: transportation.id,
        type: transportation.type,
        departureLocation: transportation.departureLocation,
        arrivalLocation: transportation.arrivalLocation,
        departureTime: transportation.departureTime ?? null,
        arrivalTime: transportation.arrivalTime ?? null,
        details: transportation.details,
        arrivalCoords: transportation.arrivalCoords ?? null,
        departureCoords: transportation.departureCoords ?? null,
        order: transportation.order,
        connectingId: transportation.connectingId,
        connectingOrder: transportation.connectingOrder,
      };
      if (placeId) {
        for (let place of newPlaces.places) {
          if (place.id === placeId) {
            const transportationToUpdate = place.transportation[
              transportationNotification.transportation.order
            ].find((transp) => transp.id === transportation.id);
            // update
            if (transportationToUpdate) {
              client.writeFragment({
                id: `Transportation:${transportation.id}`,
                fragment: TRANSPORTATION_FULL,
                data: newTransportation,
              });
              // create
            } else {
              place.transportation[
                transportationNotification.transportation.order
              ].push(newTransportation);
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
    <ActiveElementsProvider tripId={tripId}>
      <main className="h-screen">
        <Planner mode="transportation" tripId={tripId} placeId={placeId}>
          <section className="grid flex-grow grid-cols-2 overflow-hidden bg-white">
            <div className="flex justify-center overflow-auto px-4 py-8 sm:px-12 lg:px-28">
              <div className="w-full">
                <h1 className="pb-8 font-heading text-4xl font-bold">
                  Transportation
                </h1>
                {getPlacesQuery.error ? (
                  <div className="text-center text-error">
                    {getPlacesQuery.error.message}
                  </div>
                ) : null}
                {getPlacesQuery.data?.places.map((place, i) => {
                  if (
                    getPlacesQuery.data?.places &&
                    i < getPlacesQuery.data.places.length - 1
                  ) {
                    return (
                      <div className="pb-12" key={place.id}>
                        <div className="flex items-center justify-center gap-2 pb-2">
                          {/* departure place */}
                          <div className="flex flex-1 justify-center">
                            <div className="flex flex-col items-center">
                              <div className="text-xs text-grayTertiary">
                                Departing from:
                              </div>
                              <div className="line-clamp-1 cursor-pointer font-heading text-2xl font-bold duration-100 hover:underline">
                                {place.placeName}
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
                              <div className="line-clamp-1 cursor-pointer font-heading text-2xl font-bold duration-100 hover:underline ">
                                {getPlacesQuery.data?.places[i + 1].placeName}
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
            </div>

            <TransportationMap places={getPlacesQuery.data?.places ?? []} />
          </section>
        </Planner>
      </main>
    </ActiveElementsProvider>
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
