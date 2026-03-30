// src/widgets/main-map/YandexMap.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useMapMarkers } from './useMapMarkers';
import { useMapEvents } from './useMapEvents';
import { injectBalloonStyles } from './balloonStyles';
import styles from './YandexMap.module.css';

const YANDEX_API_KEY = import.meta.env.VITE_YANDEX_MAP_API_KEY;
let globalScriptLoaded = false;

export const YandexMap = ({ opportunities, onMarkerClick }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [apiLoaded, setApiLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);
  const scriptLoaded = useRef(false);
  const layoutFactoryRef = useRef(null);
  
  // Используем переданные opportunities напрямую
  const { closeAllBalloons } = useMapMarkers(
    map, 
    opportunities, 
    onMarkerClick, 
    isMobile, 
    selectedMarkerId, 
    setSelectedMarkerId
  );

  useMapEvents(map, closeAllBalloons);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (scriptLoaded.current) return;
    scriptLoaded.current = true;

    if (globalScriptLoaded) {
      if (window.ymaps) {
        window.ymaps.ready(() => {
          setApiLoaded(true);
          layoutFactoryRef.current = window.ymaps.templateLayoutFactory;
        });
      }
      return;
    }

    globalScriptLoaded = true;

    const script = document.createElement('script');
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=${YANDEX_API_KEY}&lang=ru_RU`;
    script.async = true;
    script.onload = () => {
      window.ymaps.ready(() => {
        setApiLoaded(true);
        layoutFactoryRef.current = window.ymaps.templateLayoutFactory;
      });
    };
    script.onerror = () => {
      console.error('Failed to load Yandex Maps API');
    };
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!apiLoaded || !mapRef.current) return;

    try {
      const mapInstance = new window.ymaps.Map(mapRef.current, {
        center: [55.7558, 37.6176],
        zoom: 11,
        controls: ['zoomControl', 'fullscreenControl'],
      });
      mapInstance.templateLayoutFactory = layoutFactoryRef.current;
      setMap(mapInstance);
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }, [apiLoaded]);

  useEffect(() => {
    injectBalloonStyles();
  }, []);

  // Слушаем событие обновления маркеров из MainMap
  useEffect(() => {
    const handleUpdateMarkers = (event) => {
      // Если карта ещё не загружена, игнорируем
      if (!map) return;
      
      // Принудительно обновляем маркеры, вызывая перерисовку
      // useMapMarkers сам обработает изменение opportunities через свои useEffect
      // Но нужно заставить его пересоздать маркеры
      const forceUpdate = () => {
        // Этот вызов ничего не делает, просто триггерит обновление
        // useMapMarkers уже имеет зависимость от opportunities
      };
      forceUpdate();
    };
    
    window.addEventListener('updateMapMarkers', handleUpdateMarkers);
    return () => window.removeEventListener('updateMapMarkers', handleUpdateMarkers);
  }, [map]);

  if (!apiLoaded) {
    return (
      <div className={styles.mapLoader}>
        <div>Загрузка карты...</div>
      </div>
    );
  }

  return <div ref={mapRef} className={styles.mapContainer} />;
};