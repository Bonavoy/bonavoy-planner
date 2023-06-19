'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useQuery } from '@apollo/client';
import { useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
import type { Place } from '~/graphql/generated/graphql';
import {
  faCalendar,
  faGear,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';

export default function Plan({ params }: { params: { tripId: string } }) {
  const searchParams = useSearchParams();
  const placeId = searchParams.get('placeId');

  const [places, setPlaces] = useState<[] | Place[]>([]);
  const plannerDetailsQuery = useQuery(GET_PLANNER_DETAILS, {
    variables: { tripId: params.tripId },
    onCompleted(data) {
      setPlaces(data.plannerDetails.places as Place[]);
    },
  });

  return (
    <div className=" bg-background">
      <section className="overflow-y-auto">
        <div className="h-full overflow-y-auto">
          {placeId ? (
            <PlaceView placeId={placeId} />
          ) : (
            <article className="h-full px-16 py-8">
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
                    <FontAwesomeIcon icon={faCalendar} />
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
                    <FontAwesomeIcon icon={faLocationDot} />
                    {
                      plannerDetailsQuery.data?.plannerDetails.places.length
                    }{' '}
                    Stops
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4 text-primary">
                  <button>
                    <FontAwesomeIcon icon={faGear} />
                  </button>
                </div>
              </div>
              <PlaceList
                tripId={params.tripId}
                places={places}
                setPlaces={(places) => setPlaces(places)}
              />
            </article>
          )}
        </div>
      </section>

      {/* <Mapbox /> */}
    </div>
  );
}
