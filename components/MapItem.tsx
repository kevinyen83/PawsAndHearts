import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Coordinates } from '../types/map-types';

mapboxgl.accessToken =
  'pk.eyJ1Ijoia2V2aW55ZW4iLCJhIjoiY2xxOWw0a2VmMTZjcTJrbnprM2VxbGJ1biJ9.qrpMnVDjbCuGiR2-dRZz4g';

const MapItem = ({ coordinates }: { coordinates: Coordinates }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [coordinates.lng, coordinates.lat],
        zoom: 9,
      });

      new mapboxgl.Marker()
        .setLngLat([coordinates.lng, coordinates.lat])
        .addTo(map);

      return () => map.remove();
    }
  }, []);

  return (
    <div ref={mapContainerRef} style={{ width: '100%', height: '68vh' }} />
  );
};

export default MapItem;
