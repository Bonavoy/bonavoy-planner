import Image from 'next/image';

//components
import Planner from '~/layouts/Planner';
import Mapbox from '~/components/Map/Map';
import PlaceNav from '~/components/PlaceNav';

import type { GetServerSidePropsContext } from 'next';

interface PlanProps {
  tripId: string;
  placeId: string | null;
}

export default function Plan({ tripId, placeId }: PlanProps) {
  return (
    <main className="h-screen">
      <Planner mode="planner" tripId={tripId} placeId={placeId}>
        <section className="grid flex-grow grid-cols-2 bg-white">
          <div className="py-8 px-12">
            <div className="relative h-56 w-full">
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
              <div className="absolute left-1/2 bottom-0 grid h-8 w-5/6 -translate-x-1/2 translate-y-1/2 grid-cols-3 rounded-lg bg-white shadow-md text-grayPrimary px-4">
                <div>
                  <i className="fa-solid fa-calendar" />
                </div>
              </div>
            </div>
            <div className="pt-16">
              <PlaceNav tripId={tripId} />
            </div>
            <div className="relative my-6 w-full cursor-pointer border-b border-b-grayPrimary text-2xl text-grayPrimary transition-colors duration-150 hover:text-purple">
              <i className="fa-solid fa-circle-chevron-up absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white" />
            </div>
          </div>
          <Mapbox />
        </section>
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
