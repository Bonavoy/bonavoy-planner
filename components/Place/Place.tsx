import { useQuery } from '@apollo/client';
import { eachDayOfInterval } from 'date-fns';

//queries
import { GET_PLACE } from '~/graphql/queries/place';

//utils
import { formatDate } from '~/utils/date';
interface PlaceProps {
  placeId: string;
}

export default function Place({ placeId }: PlaceProps) {
  const placeDetailsQuery = useQuery(GET_PLACE, {
    variables: { placeId },
  });

  //TODO: better loader
  if (placeDetailsQuery.loading) return <article>loading..</article>;

  return (
    <article className="flex h-full">
      <aside className="flex h-full w-max flex-col gap-12 bg-grayPrimary/5 py-32">
        {eachDayOfInterval({
          start: new Date(placeDetailsQuery.data?.place.startDate),
          end: new Date(placeDetailsQuery.data?.place.endDate),
        }).map((date, index) => (
          <h2
            className="flex flex-col px-4 text-lg font-semibold leading-tight"
            key={date.getTime()}
          >
            Day {index + 1}
            <span className="text-xs font-normal">
              {formatDate(date, {
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </h2>
        ))}
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
      </div>
    </article>
  );
}
