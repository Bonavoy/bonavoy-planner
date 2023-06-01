import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { eachDayOfInterval, isSameDay } from 'date-fns';
import clsx from 'clsx';

//components
import Dayplan from './Dayplan/Dayplan';

//queries
import { GET_PLACE } from '~/graphql/queries/place';

//utils
import { formatDate } from '~/utils/date';
interface PlaceProps {
  placeId: string;
}

export default function Place({ placeId }: PlaceProps) {
  const [day, setDay] = useState<null | Date>(null);

  const placeDetailsQuery = useQuery(GET_PLACE, {
    variables: { placeId },
  });

  //TODO: better loader
  if (placeDetailsQuery.loading) return <article>loading..</article>;

  return (
    <article className="flex h-full">
      <aside className="flex h-full w-max flex-col gap-12 bg-grayPrimary/5 py-32">
        <ul>
          {eachDayOfInterval({
            start: new Date(placeDetailsQuery.data?.place.startDate),
            end: new Date(placeDetailsQuery.data?.place.endDate),
          }).map((date, index) => (
            <li
              key={date.getTime()}
              className={clsx(
                isSameDay(day!, date) ? 'bg-primary text-white' : 'text-black',
              )}
            >
              <button
                type="button"
                title={`Day ${index + 1}`}
                className="py-4"
                onClick={() => setDay(date)}
              >
                <h2 className="flex flex-col px-4 text-lg font-semibold leading-tight">
                  Day {index + 1}
                  <span className="text-xs font-normal">
                    {formatDate(date, {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </h2>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <div className="px-8 py-8">
        <h1 className="text-3xl font-bold">
          {placeDetailsQuery.data?.place.placeName}
        </h1>
        <p>
          {formatDate(new Date(placeDetailsQuery.data?.place.startDate), {
            month: 'short',
            day: 'numeric',
          })}{' '}
          -{' '}
          {formatDate(new Date(placeDetailsQuery.data?.place.endDate), {
            month: 'short',
            day: 'numeric',
          })}
        </p>
        {day && (
          <section>
            <Dayplan />
          </section>
        )}
      </div>
    </article>
  );
}
