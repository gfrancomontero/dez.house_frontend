// components/MapOneHouse.tsx
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // Import stylesheet for mapbox

interface MapOneHouseProps {
  lonlat: [number, number]; // Tuple type for longitude and latitude
}

const MapOneHouse: React.FC<MapOneHouseProps> = ({ lonlat }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

    if (map.current) return; // Initialize map only once
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/gfrancomontero/clxytod5j001r01nw80juevts', // Custom Mapbox style
      center: lonlat,
      zoom: 15,
      interactive: false // Make the map non-draggable
    });

    // Add a pin at the given coordinates
    new mapboxgl.Marker()
      .setLngLat(lonlat)
      .addTo(map.current);

  }, [lonlat]); // Effect dependencies

  return <div className="h-full w-full" ref={mapContainer} />;
};

export default MapOneHouse;
