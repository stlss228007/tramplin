// src/widgets/opportunities-drawer/DrawerContentList.jsx
import React from 'react';
import { OpportunityCard } from '@/entities/opportunity';
import styles from './OpportunitiesDrawer.module.css';

export const DrawerContentList = ({ 
  opportunities, 
  onSaveToggle, 
  onCardClick,
  onClearAll,
  hasActiveSearch,
  hasActiveFilters,
  isFavorite
}) => {
  const isEmpty = opportunities.length === 0;
  const isFiltered = hasActiveSearch || hasActiveFilters;

  return (
    <div className={styles.cardList}>
      {!isEmpty ? (
        opportunities.map((opp) => (
          <OpportunityCard
            key={opp.ID}
            opportunity={opp}
            isSaved={isFavorite(opp.ID)}
            onSaveToggle={onSaveToggle}
            onClick={() => onCardClick(opp.ID)}
          />
        ))
      ) : (
        <div className={styles.emptyState}>
          <i className="fas fa-search"></i>
          <p>Ничего не найдено</p>
          {isFiltered && (
            <button onClick={onClearAll} className={styles.emptyStateButton}>
              Сбросить все фильтры
            </button>
          )}
        </div>
      )}
    </div>
  );
};