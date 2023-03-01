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
      className="relative flex items-center gap-2 rounded-xl border border-grayPrimary text-grayPrimary shadow-md transition-colors duration-150 hover:text-primary"
      {...attributes}
    >
      <Link
        passHref={true}
        href={{ pathname: `/trips/${tripId}/planner`, query: { placeId: id } }}
        className="py-1 pl-4 text-sm font-bold "
      >
        <span className="pr-1 text-xs font-normal">{placeIndex}.</span>
        {value}
      </Link>
      <div
        {...listeners}
        className={clsx(
          'cursor-grab rounded-r-lg py-1 px-2 hover:bg-grayPrimary/10',
          {
            'cursor-grabbing': isSorting,
          },
        )}
      >
        <i className="fa-solid fa-grip-dots-vertical" />
      </div>
      {/* <i className="fa-solid fa-solid fa-circle-xmark absolute -translate-y-1/2 -translate-x-1/2 text-xl" /> */}
    </li>
  );
}
