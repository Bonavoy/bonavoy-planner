import { Children, ReactNode } from 'react';
import Header from '~/components/Header';

interface PlannerProps {
  children: ReactNode;
  mode: 'planner' | 'transportation' | 'notes';
  tripId: string;
  placeId: string | null;
}

export default function Planner({
  children,
  mode,
  tripId,
  placeId,
}: PlannerProps) {
  return (
    <div className="flex h-full flex-col font-sans">
      <Header mode={mode} tripId={tripId} />
      {children}
    </div>
  );
}
