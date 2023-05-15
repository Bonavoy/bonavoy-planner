import { useState } from 'react';
import Image from 'next/image';
import { useQuery } from '@apollo/client';

//components
import Planner from '~/layouts/Planner';
import Mapbox from '~/components/Map/Map';
import PlaceList from '~/components/PlaceList';
import PlaceView from '~/components/Place/Place';

//queries
import { GET_PLANNER_DETAILS } from '~/graphql/queries/planner';

//utils
import { formatDate } from '~/utils/date';

//types
import type { GetServerSidePropsContext } from 'next';
import type { Place } from '~/graphql/generated/graphql';

interface PlanProps {
  tripId: string;
  placeId: string | null;
}

export default function Plan({ tripId, placeId }: PlanProps) {
  const [places, setPlaces] = useState<[] | Place[]>([]);
  const plannerDetailsQuery = useQuery(GET_PLANNER_DETAILS, {
    variables: { tripId },
    onCompleted(data) {
      setPlaces(data.plannerDetails.places as Place[]);
    },
  });

  return (
    <main className="h-screen">
      <Planner
        mode="planner"
        tripId={tripId}
        placeId={placeId}
        details={plannerDetailsQuery.data?.plannerDetails!}
      >
        <div className="grid flex-grow grid-cols-2 bg-background">
          {placeId ? (
            <PlaceView placeId={placeId} />
          ) : (
            <section className="overflow-y-auto">
              <div className="h-full overflow-y-auto px-16 py-8">
                <div className="relative mb-4 flex h-2/6 items-center justify-center rounded-xl bg-surface">
                  {plannerDetailsQuery.data?.plannerDetails.banner ? (
                    <Image
                      className="rounded-xl object-cover object-center"
                      fill={true}
                      alt="banner"
                      loader={() =>
                        plannerDetailsQuery.data?.plannerDetails.banner!
                      }
                      src="banner"
                      quality={100}
                      priority={true}
                    />
                  ) : (
                    <p className="text-grayPrimary">+ Add a photo</p>
                  )}
                </div>
                <div className="mb-10 flex items-center justify-between rounded-xl font-sans text-white">
                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 font-sans">
                      <i className="fa-solid fa-calendar" />
                      {formatDate(
                        new Date(
                          plannerDetailsQuery.data?.plannerDetails.startDate,
                        ),
                        { month: 'short', day: 'numeric' },
                      )}{' '}
                      -{' '}
                      {formatDate(
                        new Date(
                          plannerDetailsQuery.data?.plannerDetails.endDate,
                        ),
                        { month: 'short', day: 'numeric' },
                      )}
                    </button>
                    <div className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2">
                      <i className="fa-solid fa-location-dot" />
                      {
                        plannerDetailsQuery.data?.plannerDetails.places.length
                      }{' '}
                      Stops
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
          )}

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
