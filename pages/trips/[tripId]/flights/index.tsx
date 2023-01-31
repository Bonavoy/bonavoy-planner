import Planner from '~/layouts/Planner';
import Mapbox from '~/components/Map/Map';

import type { GetServerSidePropsContext } from 'next';

interface FlightsProps {
  tripId: string;
  placeId: string | null;
}

export default function Flights({ tripId, placeId }: FlightsProps) {
  return (
    <main className="h-screen">
      <Planner mode="flights" tripId={tripId} placeId={placeId}>
        {/* <section className="grid flex-grow grid-cols-2">
          <div>
            <div className="w-max">
              <PlaceNav tripId={tripId} />
            </div>
          </div>
          <Mapbox />
        </section> */}
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
