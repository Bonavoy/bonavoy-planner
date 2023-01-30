import Link from 'next/link';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';

type PlaceNavItemProps = {
  value: string;
  id: string;
  tripId: string;
};

export default function PlaceNavItem({ value, id, tripId }: PlaceNavItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isSorting,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <li
      style={style}
      ref={setNodeRef}
      className="flex items-center gap-2 rounded-2xl border"
      {...attributes}
    >
      <Link
        passHref={true}
        href={{ pathname: `/trip/${tripId}/planner`, query: { placeId: id } }}
        className="py-1 pl-4"
      >
        <span>{value}</span>
      </Link>
      <div
        {...listeners}
        className={clsx('cursor-grab py-1 px-2 rounded-r-xl hover:bg-black/10', {
          'cursor-grabbing': isSorting || isDragging,
        })}
      >
        <i className="fa-solid fa-grip-dots-vertical" />
      </div>
    </li>
  );
}
