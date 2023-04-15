import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { GET_TRIPS } from '~/graphql/queries/trip';

export default function Trips() {
  const { data, error, loading } = useQuery(GET_TRIPS, {
    variables: { limit: 16 },
  });

  return (
    <>
      <div className="h-16 border-b border-grayTertiary">
        <div className="container mx-auto">Some header</div>
      </div>

      {/* content */}
      <div className="container mx-auto pt-8">
        <div className="flex items-center justify-between pb-8">
          <h1 className="font-heading text-4xl font-bold">Trips</h1>
          <button className="h-fit rounded-lg bg-primary p-1 text-white">
            + New trip
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {data?.trips.edges.map((trip, i) => (
            <Link
              href={`/trips/${trip.node.id}/planner`}
              key={i}
              className="aspect flex aspect-[4/3] items-center justify-center rounded-md bg-surface text-center"
            >
              {trip.node.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
