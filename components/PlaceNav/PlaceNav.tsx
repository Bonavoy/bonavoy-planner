import { useState } from 'react';
import {
  DndContext,
  closestCenter,
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
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';

export default function LocationNav() {
  const [places, setPlaces] = useState(['edmonton', 'calgary']);

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
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={places} strategy={horizontalListSortingStrategy}>
        <ul className="flex gap-2 items-center">
          {places.map((place) => (
            <SortableItem key={place} id={place} value={place} />
          ))}
          <li className="flex h-7 w-7 items-center justify-center rounded-full text-lg hover:bg-black/10">
            <i className="fa-regular fa-ellipsis-vertical" />
          </li>
        </ul>
      </SortableContext>
    </DndContext>
  );
}

function SortableItem(props: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <span className="rounded-2xl border px-3 py-1">{props.value}</span>
    </li>
  );
}
