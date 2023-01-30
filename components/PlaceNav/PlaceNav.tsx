import { useState } from 'react';
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  useSortable,
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import {
  restrictToHorizontalAxis,
  restrictToParentElement,
} from '@dnd-kit/modifiers';

import { CSS } from '@dnd-kit/utilities';

export default function LocationNav() {
  const [places, setPlaces] = useState(['edmonton', 'calgary', 'toronto']);

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setPlaces((places) => {
        const oldIndex = places.indexOf(active.id);
        const newIndex = places.indexOf(over.id);

        return arrayMove(places, oldIndex, newIndex);
      });
    }
  }

  return (
    <DndContext
      sensors={useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates,
        }),
      )}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToHorizontalAxis, restrictToParentElement]}
    >
      <SortableContext items={places}>
        <div className="flex items-center gap-2">
          <ul className="flex gap-2">
            {places.map((place) => (
              <SortableItem key={place} id={place} value={place} />
            ))}
          </ul>
          <span className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-lg transition-colors duration-150 hover:bg-black/10">
            <i className="fa-regular fa-ellipsis-vertical" />
          </span>
        </div>
      </SortableContext>
    </DndContext>
  );
}

function SortableItem({ value, id }: { value: string; id: string }) {
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
    cursor: isSorting ? 'grabbing' : 'pointer',
  };

  return (
    <li
      style={style}
      ref={setNodeRef}
      className="grid place-content-center rounded-2xl border"
      {...attributes}
    >
      <div {...listeners} className="px-3 py-1">
        {value}
      </div>
    </li>
  );
}
