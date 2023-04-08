import Image from 'next/image';

//components
import Planner from '~/layouts/Planner';
import Mapbox from '~/components/Map/Map';
import PlaceList from '~/components/PlaceList';

import type { GetServerSidePropsContext } from 'next';

interface PlanProps {
  tripId: string;
  placeId: string | null;
}

export default function Plan({ tripId, placeId }: PlanProps) {
  return (
    <main className="h-screen">
      <Planner mode="planner" tripId={tripId} placeId={placeId}>
        <div className="grid flex-grow grid-cols-2 bg-background">
          <section className="overflow-y-auto">
            <div className="h-full overflow-y-auto px-8 pb-8">
              <div className="relative h-1/4">
                <Image
                  className="rounded-xl object-cover object-center"
                  fill={true}
                  alt="idk"
                  loader={() =>
                    'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80'
                  }
                  src="wtf"
                  quality={100}
                  priority={true}
                />
                <div className="font-heading absolute bottom-0 left-1/2 grid h-8 w-max -translate-x-1/2 translate-y-1/2 grid-cols-3 rounded-lg bg-background text-base text-black [&>button]:flex [&>button]:items-center [&>button]:gap-2 [&>button]:border-grayPrimary [&>button]:px-4 [&>button]:transition-colors [&>button]:duration-150">
                  <button
                    title="Dates Button"
                    type="button"
                    className="gap-2 rounded-l-lg border-b border-l border-t hover:border-primary"
                  >
                    <i className="fa-regular fa-calendar text-sm" />
                    <span className="font-bold">Feb 2 - 15</span>
                  </button>
                  <button
                    disabled={true}
                    title="Stops Button"
                    type="button"
                    className="justify-center gap-2 border"
                  >
                    <i className="fa-regular fa-location-dot text-sm" />
                    <span className="font-bold">5 stops</span>
                  </button>
                  <button
                    disabled={true}
                    title="Distance Button"
                    type="button"
                    className="justify-end gap-2 rounded-r-lg border-b border-r border-t"
                  >
                    <i className="fa-regular fa-earth-americas text-sm" />
                    <span className="font-bold">1000km</span>
                  </button>
                </div>
              </div>
              <div className="pt-10">
                <PlaceList tripId={tripId} />
              </div>
            </div>
          </section>
          <Mapbox />
        </div>
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
