import { useState, useId } from 'react';
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
import PlaceNavItem from './PlaceListItem/PlaceListItem';
import { Place } from '~/graphql/generated/graphql';

export default function PlaceNav({ tripId }: { tripId: string }) {
  const id = useId();
  const [places, setPlaces] = useState([
    {
      placeName: 'edmonton',
      id: 'lololo',
      startDate: 'Feb 1',
      endDate: 'Feb 3',
      colour: '#ab9df9',
    },
    {
      placeName: 'calgary',
      id: 'lolwtf',
      startDate: 'Feb 3',
      endDate: ' Feb 5',
      colour: '#AF2B1E',
    },
    {
      placeName: 'toronto',
      id: 'lolwtsf',
      startDate: 'Feb 5',
      endDate: ' Feb 7',
      colour: '#F39F18',
    },
    {
      placeName: 'brampton',
      id: 'lolwtssf',
      startDate: 'Feb 7',
      endDate: ' Feb 12',
      colour: '#8F8F8F',
    },
    {
      placeName: 'vancouver',
      id: 'lolwtsssf',
      startDate: 'Feb 12',
      endDate: 'Feb 16',
      colour: '#2D572C',
    },
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
      id={id}
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
              <PlaceNavItem
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
