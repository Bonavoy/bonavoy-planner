'use client';

import { useQuery } from '@apollo/client';
import { ReactNode } from 'react';
import RouteMap from '~/components/PlannerMap';
import { GET_PLACES } from '~/graphql/queries/place';

export default function MapPlannerLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { tripId: string };
}) {
  const getPlacesQuery = useQuery(GET_PLACES, {
    variables: { tripId: params.tripId },
  });

  return (
    <div className="grid w-full flex-grow grid-cols-2">
      {children}
      <RouteMap places={getPlacesQuery.data?.places ?? []} />
    </div>
  );
}
