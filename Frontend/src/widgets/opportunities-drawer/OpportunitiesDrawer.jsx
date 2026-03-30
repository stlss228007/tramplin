// src/widgets/opportunities-drawer/OpportunitiesDrawer.jsx
import React, { useState, useRef, useEffect } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { opportunities } from '@/shared/api/mock';
import { useOpportunityDetails, OpportunityDetailsModal } from '@/features/opportunity-details';
import { FilterModal, useFilters } from '@/features/filter-opportunities';
import { SearchModal, useSearch } from '@/features/search-opportunities';
import { useFavorites } from '@/features/favorites';
import { DrawerHeader } from './DrawerHeader';
import { DrawerContentList } from './DrawerContentList';
import { useDrawerSwipe } from './useDrawerSwipe';
import styles from './OpportunitiesDrawer.module.css';

export const OpportunitiesDrawer = ({ 
  searchTerm: externalSearchTerm = '', 
  onClearAll: externalOnClearAll,
  onFilteredOpportunitiesChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const indicatorRef = useRef(null);
  
  const { isOpen: isDetailsOpen, openModal: openDetailsModal, closeModal: closeDetailsModal, formattedData } = useOpportunityDetails(selectedOpportunity);
  const { toggleFavorite, isFavorite } = useFavorites();
  const {
    filteredOpportunities: filteredByFilters,
    selectedSkills,
    selectedLevels,
    selectedTypes,
    availableSkills,
    availableLevels,
    availableTypes,
    toggleSkill,
    toggleLevel,
    toggleType,
    resetFilters,
    activeFiltersCount,
  } = useFilters(opportunities);

  const {
    searchTerm,
    setSearchTerm,
    searchedOpportunities,
    resetSearch,
    hasActiveSearch,
  } = useSearch(filteredByFilters);

  // Отправляем отфильтрованные возможности в MainPage при каждом изменении
  useEffect(() => {
    console.log('📤 [OpportunitiesDrawer] Sending filtered opportunities to MainPage:', searchedOpportunities.length);
    if (onFilteredOpportunitiesChange) {
      onFilteredOpportunitiesChange(searchedOpportunities);
    }
  }, [searchedOpportunities, onFilteredOpportunitiesChange]);

  // Синхронизируем внешний поисковый запрос с внутренним состоянием
  useEffect(() => {
    console.log('🔄 [OpportunitiesDrawer] External search term:', externalSearchTerm, 'Internal:', searchTerm);
    if (externalSearchTerm !== undefined && externalSearchTerm !== searchTerm) {
      console.log('✅ [OpportunitiesDrawer] Updating internal search term to:', externalSearchTerm);
      setSearchTerm(externalSearchTerm);
    }
  }, [externalSearchTerm, searchTerm, setSearchTerm]);

  useDrawerSwipe(isOpen, setIsOpen);

  useEffect(() => {
    const handleOpenFilterModal = () => setIsFilterModalOpen(true);
    const handleOpenSearchModal = () => setIsSearchModalOpen(true);
    
    window.addEventListener('openFilterModal', handleOpenFilterModal);
    window.addEventListener('openSearchModal', handleOpenSearchModal);
    
    return () => {
      window.removeEventListener('openFilterModal', handleOpenFilterModal);
      window.removeEventListener('openSearchModal', handleOpenSearchModal);
    };
  }, []);

  const handleCardClick = (id) => {
    const opportunity = opportunities.find(o => o.ID === id);
    setSelectedOpportunity(opportunity);
    openDetailsModal();
  };

  const handleClearAll = () => {
    console.log('🧹 [OpportunitiesDrawer] Clearing all filters and search');
    resetFilters();
    resetSearch();
    if (externalOnClearAll) {
      externalOnClearAll();
    }
  };

  const displayOpportunities = searchedOpportunities;
  const hasActiveFilters = activeFiltersCount > 0;

  return (
    <>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <div 
          ref={indicatorRef}
          onClick={() => setIsOpen(true)}
          className={styles.indicator}
        >
          <div className={styles.indicatorHandle}>
            <div className={styles.indicatorBar}></div>
          </div>
        </div>

        <DrawerContent className={styles.drawerContent}>
          <div className={styles.drawerContainer}>
            <VisuallyHidden>
              <DrawerTitle>Список возможностей</DrawerTitle>
              <DrawerDescription>
                Вакансии, стажировки и менторские программы рядом с вами
              </DrawerDescription>
            </VisuallyHidden>

            <div className={styles.innerHandle} onClick={() => setIsOpen(false)}>
              <div className={styles.innerHandleBar}></div>
            </div>

            <DrawerHeader
              count={displayOpportunities.length}
              hasActiveSearch={hasActiveSearch}
              searchTerm={searchTerm}
              hasActiveFilters={hasActiveFilters}
              activeFiltersCount={activeFiltersCount}
              onClearAll={handleClearAll}
            />

            <DrawerContentList
              opportunities={displayOpportunities}
              onSaveToggle={toggleFavorite}
              onCardClick={handleCardClick}
              onClearAll={handleClearAll}
              hasActiveSearch={hasActiveSearch}
              hasActiveFilters={hasActiveFilters}
              isFavorite={isFavorite}
            />
          </div>
        </DrawerContent>
      </Drawer>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        selectedSkills={selectedSkills}
        selectedLevels={selectedLevels}
        selectedTypes={selectedTypes}
        availableSkills={availableSkills}
        availableLevels={availableLevels}
        availableTypes={availableTypes}
        onToggleSkill={toggleSkill}
        onToggleLevel={toggleLevel}
        onToggleType={toggleType}
        onReset={resetFilters}
        activeFiltersCount={activeFiltersCount}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSearch={setSearchTerm}
        initialSearchTerm={searchTerm}
      />

      <OpportunityDetailsModal
        formattedData={formattedData}
        isOpen={isDetailsOpen}
        onClose={closeDetailsModal}
        isSaved={selectedOpportunity ? isFavorite(selectedOpportunity.ID) : false}
        onSaveToggle={toggleFavorite}
      />
    </>
  );
};