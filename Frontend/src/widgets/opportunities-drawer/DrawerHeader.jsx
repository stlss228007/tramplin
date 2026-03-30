import React from 'react';
import styles from './OpportunitiesDrawer.module.css';

export const DrawerHeader = ({ 
  count, 
  hasActiveSearch, 
  searchTerm, 
  hasActiveFilters, 
  activeFiltersCount, 
  onClearAll 
}) => {
  const isFiltered = hasActiveSearch || hasActiveFilters;

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <h3>Возможности рядом</h3>
        <span className={styles.count}>{count}</span>
      </div>
      
      {isFiltered && (
        <div className={styles.activeFilters}>
          <span>
            {hasActiveSearch && <>Поиск: "{searchTerm}"</>}
            {hasActiveSearch && hasActiveFilters && <> • </>}
            {hasActiveFilters && <>Фильтров: {activeFiltersCount}</>}
          </span>
          <button onClick={onClearAll} className={styles.clearFilters}>
            Очистить всё
          </button>
        </div>
      )}
    </div>
  );
};