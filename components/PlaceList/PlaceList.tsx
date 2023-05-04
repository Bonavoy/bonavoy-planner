import { useId } from 'react';
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
  restrictToParentElement,
  restrictToVerticalAxis,
} from '@dnd-kit/modifiers';

//components
import PlaceListItem from './PlaceListItem/PlaceListItem';

//types
import { Place } from '~/graphql/generated/graphql';

export default function PlaceNav({
  tripId,
  places,
  setPlaces,
}: {
  tripId: string;
  places: Place[];
  setPlaces: (places: Place[]) => void;
}) {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = places.findIndex((place) => place.id === active.id);
      const newIndex = places.findIndex((place) => place.id === over?.id);
      setPlaces(arrayMove(places, oldIndex, newIndex));
    }
  };

  return (
    <DndContext
      id={useId()}
      sensors={useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates,
        }),
      )}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis, restrictToParentElement]}
    >
      <SortableContext items={places}>
        <div className="flex items-center justify-between gap-2">
          <section className="flex w-full flex-col gap-3">
            {places.map((place, index) => (
              <PlaceListItem
                key={place.id}
                tripId={tripId}
                place={
                  { ...place, index: index + 1 } as unknown as Place & {
                    index: number;
                  }
                }
              />
            ))}
          </section>
        </div>
      </SortableContext>
    </DndContext>
  );
}
