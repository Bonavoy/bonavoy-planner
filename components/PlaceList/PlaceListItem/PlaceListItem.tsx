import Link from 'next/link';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';

//utils
import { formatDate } from '~/utils/date';

//types
import { Place } from '~/graphql/generated/graphql';

type PlaceListItemProps = {
  place: Place & { index: number };
  tripId: string;
};

export default function PlaceListItem({ place, tripId }: PlaceListItemProps) {
  const {
    index,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isSorting,
    isDragging,
  } = useSortable({ id: place.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    color: isDragging ? place.colour : '#0A0521',
  };

  return (
    <article
      style={style}
      ref={setNodeRef}
      className="relative w-full overflow-hidden rounded-xl bg-surface transition-colors duration-150"
      {...attributes}
    >
      <div className="flex justify-between">
        <Link
          href={{
            pathname: `/trips/${tripId}/planner`,
            query: { placeId: place.id },
          }}
          className="relative z-20 w-full px-6 py-8 font-heading"
        >
          <div className="flex items-end gap-4 text-2xl font-bold">
            <span className="self-center" style={{ color: place.colour }}>
              {index + 1}.
            </span>
            <div>
              <h1 className="text-4xl">{place.placeName}</h1>
              <p className="text-base font-medium">
                {formatDate(new Date(place.startDate), {
                  month: 'short',
                  day: '2-digit',
                })}
                -
                {formatDate(new Date(place.endDate), {
                  month: 'short',
                  day: '2-digit',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
        </Link>
        <div
          {...listeners}
          style={{ color: place.colour }}
          className={clsx(
            'z-30 flex cursor-grab items-center px-6 text-3xl text-grayPrimary hover:bg-grayPrimary/10',
            {
              'cursor-grabbing': isSorting,
            },
          )}
        >
          <i className="fa-solid fa-grip-dots-vertical" />
        </div>
      </div>
    </article>
  );
}
