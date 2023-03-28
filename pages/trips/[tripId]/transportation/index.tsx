import type { GetServerSidePropsContext } from 'next';
import { useState } from 'react';

import Planner from '~/layouts/Planner';
import DropDownSelect, {
  DropDownItem,
} from '~/components/DropDownSelect/DropDownSelect';
import TransportationMap from '~/components/RouteMap/RouteMap';
import { GET_PLACES } from '~/graphql/queries/place';
import { useQuery } from '@apollo/client';
import TransportationList from '~/components/TransportationList/TransportationList';

interface TransportationProps {
  tripId: string;
  placeId: string | null;
}

export default function Transportation({
  tripId,
  placeId,
}: TransportationProps) {
  const { data, error, loading } = useQuery(GET_PLACES, {
    variables: { tripId },
  });

  const [places] = useState([
    {
      name: 'edmonton',
      id: 'lololo',
      date: 'Feb 1 - Feb 3',
      lat: 53.546,
      lng: -113.491,
    },
    {
      name: 'calgary',
      id: 'lolwtf',
      date: 'Feb 3 - Feb 5',
      lat: 51.0460954,
      lng: -114.065465,
    },
    {
      name: 'toronto',
      id: 'lolwtsf',
      date: 'Feb 5 - Feb 7',
      lat: 43.6534817,
      lng: -79.3839347,
    },
    {
      name: 'brampton',
      id: 'lolwtssf',
      date: 'Feb 7 - Feb 12',
      lat: 43.6858146,
      lng: -79.7599337,
    },
    {
      name: 'vancouver',
      id: 'lolwtsssf',
      date: 'Feb 12 - Feb 16',
      lat: 49.2608724,
      lng: -123.113952,
    },
  ]);

  return (
    <main className="h-screen">
      <Planner mode="transportation" tripId={tripId} placeId={placeId}>
        <section className="grid flex-grow grid-cols-2 overflow-hidden bg-white">
          <div className="overflow-auto py-8 px-12">
            {data?.places.map((place, i) => {
              if (i < data?.places.length - 1) {
                return (
                  <div className="pb-8" key={i}>
                    <div className="flex items-center justify-between">
                      <div className="grow basis-0 text-left">
                        <div className="text-2xl font-semibold">
                          {data?.places[i]?.place_name}
                        </div>
                        <div className="text-sm">Feb 1</div>
                      </div>

                      <div className="grow basis-0 text-right">
                        <div className="text-2xl font-semibold">
                          {data?.places[i + 1]?.place_name}
                        </div>
                        <div className="text-sm">Feb 1</div>
                      </div>
                    </div>
                    <TransportationList transportation={place.transportation} />
                  </div>
                );
              }
            })}
          </div>
          <TransportationMap locations={places} />
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
