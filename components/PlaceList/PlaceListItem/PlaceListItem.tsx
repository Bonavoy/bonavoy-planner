import Link from 'next/link';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';

//types
import { Place } from '~/graphql/generated/graphql';

type PlaceNavItemProps = {
  place: Place & { index: number };
  tripId: string;
};

export default function PlaceNavItem({ place, tripId }: PlaceNavItemProps) {
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
    <li
      style={style}
      ref={setNodeRef}
      className="relative w-full overflow-hidden rounded-xl bg-surface transition-colors duration-150"
      {...attributes}
    >
      <div className="flex justify-between">
        <div className="relative z-20 px-6 py-8">
          <div className="flex items-end gap-2 font-heading text-2xl font-bold">
            <span style={{ color: place.colour }}>{index + 1}.</span>
            <h1 className="font-heading text-4xl font-bold">
              {place.place_name}
            </h1>
          </div>
          <p>
            {place.startDate} - {place.endDate}
          </p>
        </div>
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
    </li>
  );
}
