import { useQuery } from '@apollo/client';
import type { GetServerSidePropsContext } from 'next';

import Planner from '~/layouts/Planner';
import TransportationMap from '~/components/RouteMap/RouteMap';
import { GET_PLACES } from '~/graphql/queries/place';
import TransportationList from '~/components/TransportationList/TransportationList';
import { useState } from 'react';

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

  return (
    <main className="h-screen">
      <Planner mode="transportation" tripId={tripId} placeId={placeId}>
        <section className="grid flex-grow grid-cols-2 overflow-hidden bg-white">
          <div className="overflow-auto px-12 py-8">
            {getPlacesQuery?.places.map((place, i) => (
              <div className="pb-8" key={i}>
                <div className="flex items-baseline justify-start gap-2">
                  <div className="font-heading text-2xl font-bold">
                    {place.place_name}
                  </div>
                  <div className="font-heading text-sm font-medium">Feb 1</div>
                </div>
                <TransportationList
                  transportation={place.transportation}
                  placeId={place.id}
                  tripId={tripId}
                />
              </div>
            ))}
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
