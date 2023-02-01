import { useState } from 'react';
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import {
  restrictToHorizontalAxis,
  restrictToParentElement,
} from '@dnd-kit/modifiers';

//components
import PlaceNavItem from './PlaceNavItem/PlaceNavItem';

export default function PlaceNav({ tripId }: { tripId: string }) {
  const [places, setPlaces] = useState([
    { name: 'edmonton', id: 'lololo' },
    { name: 'calgary', id: 'lolwtf' },
    { name: 'toronto', id: 'lolwtsf' },
    { name: 'brampton', id: 'lolwtssf' },
    { name: 'vancouver', id: 'lolwtsssf' },
  ]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setPlaces((places) => {
        const oldIndex = places.findIndex((place) => place.id === active.id);
        const newIndex = places.findIndex((place) => place.id === over?.id);
        return arrayMove(places, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      id="PlaceNavDND"
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
        <div className="flex items-center justify-between gap-2">
          <span className="flex h-7 w-7 cursor-pointer items-center justify-center text-grayPrimary transition-colors duration-150 hover:text-purple">
            <i className="fa-solid fa-house-chimney" />
          </span>
          <span className="flex h-7 w-7 cursor-pointer items-center justify-center text-grayPrimary transition-colors duration-150 hover:text-purple">
            <i className="fa-solid fa-gear" />
          </span>
          <ul className="flex w-full gap-3 overflow-x-auto">
            {places.map((place, index) => (
              <PlaceNavItem
                key={place.id}
                id={place.id}
                placeIndex={index + 1}
                tripId={tripId}
                value={place.name}
              />
            ))}
          </ul>
        </div>
      </SortableContext>
    </DndContext>
  );
}
