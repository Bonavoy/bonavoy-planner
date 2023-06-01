import { ReactNode } from 'react';
import Header from '~/components/Header';

//types
import { PlannerDetailsQuery } from '~/graphql/generated/graphql';

interface PlannerProps {
  children: ReactNode;
  mode: 'planner' | 'transportation' | 'notes';
  tripId: string;
  placeId: string | null;
  details: PlannerDetailsQuery['plannerDetails'];
}

export default function Planner({
  children,
  mode,
  tripId,
  placeId,
  details,
}: PlannerProps) {
  return (
    <div className="flex h-full flex-col font-sans">
      <Header mode={mode} tripId={tripId} details={details} />
      {children}
    </div>
  );
}
