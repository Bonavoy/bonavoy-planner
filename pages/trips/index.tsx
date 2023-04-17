import { useQuery } from '@apollo/client';
import Link from 'next/link';
import Image from 'next/image';
import { GET_TRIPS } from '~/graphql/queries/trip';

export default function Trips() {
  const { data, error, loading } = useQuery(GET_TRIPS, {
    variables: { limit: 16 },
  });

  return (
    <>
      <div className="flex h-16 items-center border-b border-grayTertiary">
        <div className="container mx-auto">
          <div className="font-heading text-xl font-semibold">Bonavoy</div>
        </div>
      </div>

      {/* content */}
      <div className="container mx-auto px-2 pt-8">
        <div className="flex items-center justify-between pb-8">
          <h1 className="font-heading text-4xl font-bold">Trips</h1>
          <button className="h-fit rounded-lg bg-primary p-2 text-sm text-white duration-150 hover:bg-primary/80">
            + New trip
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data?.trips.edges.map((trip, i) => (
            <Link
              href={`/trips/${trip.node.id}/planner`}
              key={i}
              className="aspect relative flex aspect-[4/3] items-center justify-center rounded-md border border-surface"
            >
              <Image
                src="https://banffnationalpark.com/wp-content/uploads/2022/04/banff-guide-1536x1024.jpg"
                alt={trip.node.name}
                fill
                className="rounded-md"
              />
              <div className="absolute bottom-0 z-10 w-full rounded-b-md bg-white p-2">
                <div className="pb-1 text-sm font-medium">{trip.node.name}</div>
                <div className="pb-1">
                  <div className="w-fit rounded-full bg-surface px-2 text-xs">
                    planning
                  </div>
                </div>

                <div className="w-fit rounded-full pb-1 text-xs">
                  days until trip
                </div>
                <div className="w-fit rounded-full pb-1 text-xs text-grayPrimary">
                  97 days
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
