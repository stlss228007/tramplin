// src/widgets/main-map/MainMap.jsx
import React, { useState, useEffect } from 'react';
import { YandexMap } from './YandexMap';
import { opportunities } from '@/shared/api/mock-data';
import { useOpportunityDetails, OpportunityDetailsModal } from '@/features/opportunity-details';
import { useFavorites } from '@/features/favorites';
import styles from './MainMap.module.css'; // ← исправлено: MainMap.module.css, а не MainPage.module.css

export const MainMap = ({ filteredOpportunities = null }) => {
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const { isOpen, openModal, closeModal, formattedData } = useOpportunityDetails(selectedOpportunity);
  const { toggleFavorite, isFavorite } = useFavorites();
  
  // Используем переданные отфильтрованные возможности или все, если не переданы
  const opportunitiesToShow = filteredOpportunities !== null ? filteredOpportunities : opportunities;

  const handleMarkerClick = (opportunity) => {
    setSelectedOpportunity(opportunity);
    openModal();
  };

  // При изменении отфильтрованных возможностей отправляем событие в YandexMap
  useEffect(() => {
    // Создаём событие для обновления маркеров
    const event = new CustomEvent('updateMapMarkers', { 
      detail: { 
        visibleIds: opportunitiesToShow.map(opp => opp.ID),
        opportunities: opportunitiesToShow // Передаём полный список для обновления
      } 
    });
    window.dispatchEvent(event);
  }, [opportunitiesToShow]);

  return (
    <>
      <div className={styles.mapContainer}>
        <YandexMap
          opportunities={opportunitiesToShow}
          onMarkerClick={handleMarkerClick}
        />
      </div>

      <OpportunityDetailsModal
        formattedData={formattedData}
        isOpen={isOpen}
        onClose={closeModal}
        isSaved={selectedOpportunity ? isFavorite(selectedOpportunity.ID) : false}
        onSaveToggle={toggleFavorite}
      />
    </>
  );
};