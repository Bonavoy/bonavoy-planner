import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { GET_TRIPS } from '~/graphql/queries/trip';

export default function Trips() {
  const { data, error, loading } = useQuery(GET_TRIPS, {
    variables: { limit: 16 },
  });

  return (
    <div className="md:container">
      {data?.trips.edges.map((trip, i) => (
        <Link href={`/trips/${trip.node.id}/planner`} key={i}>
          {trip.node.name}
        </Link>
      ))}
    </div>
  );
}
