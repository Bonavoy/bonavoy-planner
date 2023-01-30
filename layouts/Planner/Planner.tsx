import Header from '~/components/Header';

interface PlannerProps {
  tripId: string;
  placeId: string | null;
}

export default function Planner({ tripId, placeId }: PlannerProps) {
  return (
    <main className="font-sans">
      <Header tripId={tripId} />
    </main>
  );
}
