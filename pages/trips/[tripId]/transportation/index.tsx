import { useQuery, useSubscription } from '@apollo/client';
import type { GetServerSidePropsContext } from 'next';

//components
import Planner from '~/layouts/Planner';
import TransportationMap from '~/components/RouteMap/RouteMap';
import TransportationList from '~/components/TransportationList/TransportationList';
import ActiveElementsProvider from '~/components/ActiveElementsProvider';

//queries
import { GET_PLACES } from '~/graphql/queries/place';
import { TRANSPORTATION_UPDATED } from '~/graphql/subscriptions/transportation';
import { TRANSPORTATION_FULL } from '~/graphql/fragments/transportation';
import { GET_PLANNER_DETAILS } from '~/graphql/queries/planner';

//utils
import { cloneDeep } from '@apollo/client/utilities';

//types
import { Transportation } from '~/graphql/generated/graphql';

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

  //TODO: THIS PULLS PLACES ALSO, SO WE CAN PROBABLY TEMOVE THE PLACES QUERY ABOVE, BUT I DIDNT WANT TO BREAK ANYTHING
  const plannerDetailsQuery = useQuery(GET_PLANNER_DETAILS, {
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

      const placesQueryClone = cloneDeep(placesQuery);

      // deletion
      if (deleted) {
        for (const place of placesQueryClone.places) {
          for (const idx in place.transportation) {
            place.transportation[idx] = place.transportation[idx].filter(
              (transp) => transportation.id !== transp.id,
            );
          }
        }

        // remove empty connecting transportation arrays
        for (const place of placesQueryClone.places) {
          place.transportation = place.transportation.filter(
            (transportation) => transportation.length,
          );
        }

        client.writeQuery({
          query: GET_PLACES,
          id: tripId,
          data: placesQueryClone,
        });
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
        const place = placesQueryClone.places.find(
          (place) => place.id === placeId,
        );
        if (!place) return;

        const connections = place.transportation.find(
          (connections) =>
            connections[0].connectingId === transportation.connectingId,
        );

        if (!connections) {
          place.transportation.push([transportation]);
          client.writeQuery({
            query: GET_PLACES,
            id: tripId,
            data: placesQueryClone,
          });
          return;
        }

        const existingTransportation = connections.find(
          (transp) => transp.id === transportation.id,
        );

        if (!existingTransportation) {
          connections.push(transportation);
          client.writeQuery({
            query: GET_PLACES,
            id: tripId,
            data: placesQueryClone,
          });
          return;
        }

        client.writeFragment({
          id: `Transportation:${transportation.id}`,
          fragment: TRANSPORTATION_FULL,
          data: newTransportation,
        });
      }
    },
  });

  return (
    <ActiveElementsProvider tripId={tripId}>
      <main className="h-screen">
        <Planner
          mode="transportation"
          tripId={tripId}
          placeId={placeId}
          details={plannerDetailsQuery.data?.plannerDetails!}
        >
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
                      <div key={place.id}>
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
