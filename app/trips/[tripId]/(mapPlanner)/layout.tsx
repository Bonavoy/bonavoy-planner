'use client';

import { ReactNode } from 'react';
import Mapbox from '~/components/Map';

export default function MapPlannerLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="grid w-full flex-grow grid-cols-2">
      {children}
      <Mapbox />
    </div>
  );
}
