import { useRef, useEffect, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { Feature } from 'geojson';
import { PlacesQuery, TransportationType } from '~/graphql/generated/graphql';
import { useLazyQuery } from '@apollo/client';
import { GET_ROUTE_SEGMENTS } from '~/graphql/queries/route';

mapboxgl.accessToken =
  'pk.eyJ1IjoibmVpbHpvbiIsImEiOiJja2R5MjNkc3cyNDd5MnVudWVvaXptY3IyIn0.t7H18YFnJnci9cvjd3Q-Tg';

interface RouteMapProps {
  places: PlacesQuery['places'];
}

export default function RouteMap({ places }: RouteMapProps) {
  const mapContainer = useRef<null | HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const map = useRef<null | mapboxgl.Map>(null);
  const [getRouteSegments] = useLazyQuery(GET_ROUTE_SEGMENTS);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
      container: mapContainer.current as HTMLElement,
      style: 'mapbox://styles/mapbox/streets-v12',
    });
  }, []);

  const drawRouteSegments = useCallback(async () => {
    if (!map.current || !isLoaded) return;

    if (!places) return;
    const features: Feature[] = [];

    const transportArr = places.flatMap((place) =>
      place.transportation.flatMap((connections) => connections),
    );

    for (const transport of transportArr) {
      if (transport.type === TransportationType.Car && transport.route) {
        features.push({
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'MultiLineString',
            coordinates: [transport.route.segments],
          },
        });
      } else if (
        transport.type === TransportationType.Plane &&
        transport.arrivalCoords?.lng &&
        transport.arrivalCoords?.lat &&
        transport.departureCoords?.lng &&
        transport.departureCoords?.lat
      ) {
        features.push({
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: [
              [transport.departureCoords.lng, transport.departureCoords.lat],
              [transport.arrivalCoords.lng, transport.arrivalCoords.lat],
            ],
          },
        });
      }
    }

    const route: GeoJSON.FeatureCollection = {
      type: 'FeatureCollection',
      features: features,
    };

    const routeSource = map.current!.getSource(
      'route',
    ) as mapboxgl.GeoJSONSource;

    if (!routeSource) {
      map.current!.addSource('route', {
        type: 'geojson',
        data: route,
      });
      map.current!.addLayer({
        id: 'route',
        source: 'route',
        type: 'line',
        paint: {
          'line-width': 2,
          'line-color': '#5843BE',
        },
      });
    } else {
      routeSource.setData(route);
    }
  }, [places, isLoaded, getRouteSegments]);

  useEffect(() => {
    if (!map.current) return;
    drawRouteSegments();

    map.current.on('load', () => {
      drawRouteSegments();
      setIsLoaded(true);
    });
  }, [isLoaded, drawRouteSegments]);

  return <div ref={mapContainer} className="map-container h-full w-full" />;
}
