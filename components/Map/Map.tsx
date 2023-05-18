import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
  'pk.eyJ1IjoibmVpbHpvbiIsImEiOiJja2R5MjNkc3cyNDd5MnVudWVvaXptY3IyIn0.t7H18YFnJnci9cvjd3Q-Tg';

export default function Mapbox() {
  const mapContainer = useRef<null | HTMLDivElement>(null);
  const map = useRef<null | mapboxgl.Map>(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
      container: mapContainer.current as HTMLElement,
      style: 'mapbox://styles/mapbox/streets-v12',
    });

    map.current.on('load', function () {
      map.current?.addSource('admin-1', {
        type: 'vector',
        url: 'mapbox://mapbox.boundaries-adm1-v4',
        promoteId: 'mapbox_id',
      });

      // Define a filter for US worldview boundaries
      let worldviewFilter = [
        'any',
        ['==', 'all', ['get', 'worldview']],
        ['in', 'US', ['get', 'worldview']],
      ];

      // Add a style layer with the admin-1 source below map labels
      map.current?.addLayer(
        {
          id: 'admin-1-fill',
          type: 'fill',
          source: 'admin-1',
          'source-layer': 'boundaries_admin_1',
          filter: worldviewFilter,
          paint: {
            'fill-color': '#CCCCCC',
            'fill-opacity': 0.5,
          },
        },
        // This final argument indicates that we want to add the Boundaries layer
        // before the `waterway-label` layer that is in the map from the Mapbox
        // Light style. This ensures the admin polygons are rendered below any labels
        'waterway-label',
      );
    });
  });

  return <div ref={mapContainer} className="map-container h-full w-full" />;
}
