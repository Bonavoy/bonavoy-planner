import Link from 'next/link';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';

type PlaceNavItemProps = {
  value: string;
  id: string;
  tripId: string;
  placeIndex: number;
};

export default function PlaceNavItem({
  value,
  id,
  tripId,
  placeIndex,
}: PlaceNavItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isSorting,
  } = useSortable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <li
      style={style}
      ref={setNodeRef}
      className="relative flex items-center gap-2 rounded-lg border"
      {...attributes}
    >
      <Link
        passHref={true}
        href={{ pathname: `/trip/${tripId}/planner`, query: { placeId: id } }}
        className="py-1 pl-4 text-sm"
      >
        <span className='text-xs pr-1 font-bold'>{placeIndex}.</span>
        {value}
      </Link>
      <div
        {...listeners}
        className={clsx(
          'cursor-grab rounded-r-lg py-1 px-2 hover:bg-black/10',
          {
            'cursor-grabbing': isSorting,
          },
        )}
      >
        <i className="fa-solid fa-grip-dots-vertical" />
      </div>
      <i className="fa-solid fa-solid fa-circle-xmark absolute -translate-y-1/2 -translate-x-1/2 text-xl" />
    </li>
  );
}
