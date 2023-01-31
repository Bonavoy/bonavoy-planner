import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

export default function Mapbox() {
  const mapContainer = useRef<null | HTMLDivElement>(null);
  const map = useRef<null | mapboxgl.Map>(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
      container: mapContainer.current as HTMLElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      //   dragPan: false,
      //   doubleClickZoom: false,
      //   scrollZoom: false,
      //   keyboard: false,
    });
  });

  //   useEffect(() => {
  //     if (!map.current) return; // wait for map to initialize
  //     map.current.on('move', () => {
  //       setLng(map.current.getCenter().lng.toFixed(4));
  //       setLat(map.current.getCenter().lat.toFixed(4));
  //       setZoom(map.current.getZoom().toFixed(2));
  //     });
  //   });

  return <div ref={mapContainer} className="h-full w-full map-container" />;
}
