import { useRef, useEffect, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { Feature, Position } from 'geojson';
import {
  InputCoords,
  Place,
  PlacesQuery,
  TransportationType,
} from '~/graphql/generated/graphql';
import { useLazyQuery } from '@apollo/client';
import { GET_ROUTE_SEGMENTS } from '~/graphql/queries/route';

mapboxgl.accessToken =
  'pk.eyJ1IjoibmVpbHpvbiIsImEiOiJja2R5MjNkc3cyNDd5MnVudWVvaXptY3IyIn0.t7H18YFnJnci9cvjd3Q-Tg';

export interface Location {
  // mode: 'plane' | 'car';
  lat: number;
  lng: number;
}

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

    let i = 0;
    const waypointSegments: InputCoords[][] = [];
    const transportArr = places.flatMap((place) => place.transportation);
    while (i < transportArr.length) {
      let transport = transportArr[i];
      if (
        !transport.arrivalCoords?.lng ||
        !transport.arrivalCoords?.lat ||
        !transport.departureCoords?.lng ||
        !transport.departureCoords?.lat
      ) {
        i++;
      } else if (transport.type === TransportationType.Plane) {
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
        i++;
      } else if (transport.type === TransportationType.Car) {
        const waypointSegment: InputCoords[] = [];

        while (
          i < transportArr.length &&
          transportArr[i].type === TransportationType.Car
        ) {
          waypointSegment.push({
            lat: transportArr[i].departureCoords!.lat,
            lng: transportArr[i].departureCoords!.lng,
          });
          i++;
        }

        if (i - 1 < transportArr.length) {
          waypointSegment.push({
            lat: transportArr[i - 1].arrivalCoords!.lat,
            lng: transportArr[i - 1].arrivalCoords!.lng,
          });
        }

        waypointSegments.push(waypointSegment);
      }
    }

    const routeSegments = await getRouteSegments({
      variables: { segmentWaypoints: waypointSegments },
    });

    features.push({
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'MultiLineString',
        coordinates: routeSegments.data?.routeSegments!,
      },
    });

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
