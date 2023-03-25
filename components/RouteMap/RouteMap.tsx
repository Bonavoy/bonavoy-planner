import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { Feature } from 'geojson';

mapboxgl.accessToken =
  'pk.eyJ1IjoibmVpbHpvbiIsImEiOiJja2R5MjNkc3cyNDd5MnVudWVvaXptY3IyIn0.t7H18YFnJnci9cvjd3Q-Tg';

export interface Location {
  // mode: 'plane' | 'car';
  lat: number;
  lng: number;
}

interface RouteMapProps {
  locations: Location[];
}

export default function RouteMap({ locations }: RouteMapProps) {
  const mapContainer = useRef<null | HTMLDivElement>(null);
  const map = useRef<null | mapboxgl.Map>(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
      container: mapContainer.current as HTMLElement,
      style: 'mapbox://styles/mapbox/streets-v12',
    });
  });

  useEffect(() => {
    if (!map.current) return; // initialize map only once
    map.current!.on('load', () => {
      const features: Feature[] = [];

      for (let i = 0; i < locations.length - 1; i++) {
        const src = locations[i];
        const dest = locations[i + 1];

        features.push({
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: [
              [src.lng, src.lat],
              [dest.lng, dest.lat],
            ],
          },
        });
      }

      const route: GeoJSON.FeatureCollection = {
        type: 'FeatureCollection',
        features: features,
      };

      const routeSource = map.current!.getSource('route');
      if (!routeSource) {
        map.current!.addSource('route', {
          type: 'geojson',
          data: route,
        });
      } else {
        routeSource.setData(route);
      }

      map.current!.addLayer({
        id: 'route',
        source: 'route',
        type: 'line',
        paint: {
          'line-width': 2,
          'line-color': '#5843BE',
        },
      });
    });
  }, [locations]);

  return <div ref={mapContainer} className="map-container h-full w-full" />;
}
