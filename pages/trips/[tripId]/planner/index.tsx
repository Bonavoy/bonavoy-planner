import { useState } from 'react';
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
  const [places] = useState([
    { name: 'edmonton', id: 'lololo', date: 'Feb 1 - Feb 3' },
    { name: 'calgary', id: 'lolwtf', date: 'Feb 3 - Feb 5' },
    { name: 'toronto', id: 'lolwtsf', date: 'Feb 5 - Feb 7' },
    { name: 'brampton', id: 'lolwtssf', date: 'Feb 7 - Feb 12' },
    { name: 'vancouver', id: 'lolwtsssf', date: 'Feb 12 - Feb 16' },
  ]);

  return (
    <main className="h-screen">
      <Planner mode="planner" tripId={tripId} placeId={placeId}>
        <section className="grid flex-grow grid-cols-2 bg-white overflow-hidden">
          <div className="py-8 px-12 overflow-auto">
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
              <div className="absolute left-1/2 bottom-0 grid h-8 w-max -translate-x-1/2 translate-y-1/2 grid-cols-3 rounded-lg bg-white text-base text-black shadow-md [&>button]:flex [&>button]:items-center [&>button]:gap-2 [&>button]:border-grayPrimary [&>button]:px-4 [&>button]:transition-colors [&>button]:duration-150">
                <button
                  title="Dates Button"
                  type="button"
                  className="gap-2 rounded-l-lg border-l border-t border-b hover:border-purple"
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
                  className="justify-end gap-2 rounded-r-lg border-r border-t border-b"
                >
                  <i className="fa-regular fa-earth-americas text-sm" />
                  <span className="font-bold">1000km</span>
                </button>
              </div>
            </div>
            <div className="pt-10">
              <PlaceNav tripId={tripId} />
            </div>
            <div className="relative my-6 w-full cursor-pointer border-b border-b-grayPrimary text-2xl text-grayPrimary transition-colors duration-150 hover:text-purple">
              <i className="fa-solid fa-circle-chevron-up absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white" />
            </div>

            <div>
              {places.map((place) => (
                <div className='py-8' key={place.id}>
                  <h1 className="text-4xl font-bold text-black">
                    {place.name}
                  </h1>
                  <p>{place.date}</p>
                </div>
              ))}
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
