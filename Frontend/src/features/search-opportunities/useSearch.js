// src/features/search-opportunities/useSearch.js
import { useState, useMemo, useEffect } from 'react';

export const useSearch = (opportunities) => {
  const [searchTerm, setSearchTerm] = useState('');

  const searchedOpportunities = useMemo(() => {
    console.log('🔎 [useSearch] Computing with term:', searchTerm, 'opportunities count:', opportunities?.length);
    
    if (!searchTerm.trim()) {
      console.log('🔎 [useSearch] No search term, returning all opportunities');
      return opportunities;
    }

    const lowerSearchTerm = searchTerm.toLowerCase().trim();
    console.log('🔎 [useSearch] Searching for:', lowerSearchTerm);
    
    const filtered = opportunities.filter(opp => {
      // Поиск по названию
      if (opp.Title?.toLowerCase().includes(lowerSearchTerm)) {
        console.log('🔎 [useSearch] Match by title:', opp.Title);
        return true;
      }
      
      // Поиск по названию компании
      const companyName = opp.Employer?.companyName || '';
      if (companyName.toLowerCase().includes(lowerSearchTerm)) {
        console.log('🔎 [useSearch] Match by company:', companyName);
        return true;
      }
      
      // Поиск по навыкам
      const skills = opp.Tags?.map(tag => tag.name) || [];
      if (skills.some(skill => skill.toLowerCase().includes(lowerSearchTerm))) {
        console.log('🔎 [useSearch] Match by skills:', skills);
        return true;
      }
      
      // Поиск по описанию
      if (opp.Description?.toLowerCase().includes(lowerSearchTerm)) {
        console.log('🔎 [useSearch] Match by description');
        return true;
      }
      
      // Поиск по городу
      if (opp.LocationCity?.toLowerCase().includes(lowerSearchTerm)) {
        console.log('🔎 [useSearch] Match by location:', opp.LocationCity);
        return true;
      }
      
      return false;
    });
    
    console.log('🔎 [useSearch] Search results count:', filtered.length);
    return filtered;
  }, [opportunities, searchTerm]);

  const resetSearch = () => {
    console.log('🧹 [useSearch] Resetting search term');
    setSearchTerm('');
  };

  return {
    searchTerm,
    setSearchTerm,
    searchedOpportunities,
    resetSearch,
    hasActiveSearch: searchTerm.trim().length > 0,
  };
};