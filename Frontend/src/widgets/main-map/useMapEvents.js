import { useEffect } from 'react';

export const useMapEvents = (map, onMapClick) => {
  useEffect(() => {
    if (!map) return;

    const handleMapClick = (e) => {
      // onMapClick(); // Закомментировано, чтобы не закрывать открытый балун при клике по карте
    };

    map.events.add('click', handleMapClick);

    return () => {
      map.events.remove('click', handleMapClick);
    };
  }, [map, onMapClick]);
};