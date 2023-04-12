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
            <div className="h-full overflow-y-auto px-16 py-8">
              <div className="relative mb-14 flex h-2/6 items-center justify-center rounded-xl bg-surface">
                <p className="text-grayPrimary">+ Add a photo</p>
                {/* <Image
                  className="rounded-xl object-cover object-center"
                  fill={true}
                  alt="banner"
                  loader={() =>
                    'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80'
                  }
                  src="banner"
                  quality={100}
                  priority={true}
                /> */}
                <div className="absolute bottom-0 flex w-5/6 translate-y-1/2 flex-col items-center rounded-xl bg-primary py-4 font-sans text-white">
                  lol
                  {/* <button className="flex items-center gap-2 rounded-lg bg-primary px-3 py-1 font-sans text-sm text-white">
                    <i className="fa-regular fa-plus" /> add place
                  </button> */}
                </div>
              </div>
              {/* <div className="my-4 flex justify-center gap-2 font-heading">
                <button
                  title="Dates Button"
                  type="button"
                  className="flex items-center gap-2 rounded-xl bg-primary text-white px-4 py-1"
                >
                  <i className="fa-regular fa-calendar text-sm" />
                  <span className="font-medium">Feb 2 - 15</span>
                </button>
                <button
                  disabled={true}
                  title="Stops Button"
                  type="button"
                  className="flex items-center gap-2 rounded-xl bg-primary text-white px-4 py-1"
                >
                  <i className="fa-regular fa-location-dot text-sm" />
                  <span className="font-medium">5 stops</span>
                </button>
                <button
                  disabled={true}
                  title="Distance Button"
                  type="button"
                  className="flex items-center gap-2 rounded-xl bg-primary text-white px-4 py-1"
                >
                  <i className="fa-regular fa-earth-americas text-sm" />
                  <span className="font-medium">1000km</span>
                </button>
              </div> */}

              <PlaceList tripId={tripId} />
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
