import { useQuery, useSubscription } from '@apollo/client';
import type { GetServerSidePropsContext } from 'next';

import Planner from '~/layouts/Planner';
import TransportationMap from '~/components/RouteMap/RouteMap';
import { GET_PLACES } from '~/graphql/queries/place';
import TransportationList from '~/components/TransportationList/TransportationList';
import { TRANSPORTATION_UPDATED } from '~/graphql/subscriptions/transportation';
import { TRANSPORTATION_FULL } from '~/graphql/fragments/transportation';

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
      if (!data.data?.transportation) return;

      console.log(
        'we got this and probably why delete no worky',
        data.data.transportation,
      );

      client.writeFragment({
        id: `Transportation:${data.data.transportation.id}`,
        fragment: TRANSPORTATION_FULL,
        data: {
          id: data.data.transportation.id,
          type: data.data.transportation.type,
          departure_location: data.data.transportation.departure_location,
          arrival_location: data.data.transportation.arrival_location,
          departure_time: data.data.transportation.departure_time ?? null,
          arrival_time: data.data.transportation.arrival_time ?? null,
          details: data.data.transportation.details,
          arrivalCoords: data.data.transportation.arrivalCoords ?? null,
          departureCoords: data.data.transportation.departureCoords ?? null,
        },
      });
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
          <TransportationMap places={getPlacesQuery?.places} />
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
