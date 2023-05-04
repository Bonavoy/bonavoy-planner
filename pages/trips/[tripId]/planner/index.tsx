import { useState } from 'react';
import Image from 'next/image';
import { useQuery } from '@apollo/client';

//components
import Planner from '~/layouts/Planner';
import Mapbox from '~/components/Map/Map';
import PlaceList from '~/components/PlaceList';

//queries
import { GET_PLACES } from '~/graphql/queries/place';

import type { GetServerSidePropsContext } from 'next';
import type { Place } from '~/graphql/generated/graphql';

interface PlanProps {
  tripId: string;
  placeId: string | null;
}

export default function Plan({ tripId, placeId }: PlanProps) {
  const [places, setPlaces] = useState<[] | Place[]>([]);
  const getPlacesQuery = useQuery(GET_PLACES, {
    variables: { tripId },
    onCompleted(data) {
      setPlaces(data.places as Place[]);
    },
  });

  return (
    <main className="h-screen">
      <Planner mode="planner" tripId={tripId} placeId={placeId}>
        <div className="grid flex-grow grid-cols-2 bg-background">
          <section className="overflow-y-auto">
            <div className="h-full overflow-y-auto px-16 py-8">
              <div className="relative mb-4 flex h-2/6 items-center justify-center rounded-xl bg-surface">
                {/* <p className="text-grayPrimary">+ Add a photo</p> */}
                <Image
                  className="rounded-xl object-cover object-center"
                  fill={true}
                  alt="banner"
                  loader={() =>
                    'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80'
                  }
                  src="banner"
                  quality={100}
                  priority={true}
                />
              </div>
              <div className="mb-10 flex items-center justify-between rounded-xl font-sans text-white">
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 font-sans">
                    <i className="fa-solid fa-calendar" />
                    Feb 2 - 15 (13 days)
                  </button>
                  <div className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2">
                    <i className="fa-solid fa-location-dot" />5 stops (234 km)
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4 text-primary">
                  {/* <button>
                    <i className="fa-solid fa-plus-large" />
                  </button> */}
                  <button>
                    <i className="fa-solid fa-gear text-lg" />
                  </button>
                </div>
              </div>
              <PlaceList
                tripId={tripId}
                places={places}
                setPlaces={(places) => setPlaces(places)}
              />
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
