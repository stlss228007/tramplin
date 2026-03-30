// src/features/filter-opportunities/useFilters.js
import { useState, useMemo } from 'react';
import { AVAILABLE_LEVELS, AVAILABLE_TYPES } from '@/shared/constants/filters';
import { getOpportunityTypeName, getExperienceLevelName } from '@/shared/lib';

export const useFilters = (opportunities) => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  // Получаем все доступные навыки из возможностей
  const availableSkills = useMemo(() => {
    const skillsSet = new Set();
    opportunities.forEach(opp => {
      if (opp.Tags && opp.Tags.length) {
        opp.Tags.forEach(tag => skillsSet.add(tag.name));
      }
    });
    return Array.from(skillsSet).sort();
  }, [opportunities]);

  // Фильтруем возможности
  const filteredOpportunities = useMemo(() => {
    return opportunities.filter(opp => {
      // Фильтрация по навыкам
      if (selectedSkills.length > 0) {
        const oppSkillNames = opp.Tags?.map(tag => tag.name) || [];
        const hasSkill = selectedSkills.some(skill => oppSkillNames.includes(skill));
        if (!hasSkill) return false;
      }

      // Фильтрация по уровню (с учётом маппинга числовых значений)
      if (selectedLevels.length > 0) {
        const oppLevelNumber = opp.ExperienceLevel;
        const oppLevelName = getExperienceLevelName(oppLevelNumber);
        const hasLevel = selectedLevels.some(level => oppLevelName === level);
        if (!hasLevel) return false;
      }

      // Фильтрация по типу (с учётом маппинга числовых значений)
      if (selectedTypes.length > 0) {
        const oppTypeNumber = opp.OpportunityType;
        const oppTypeName = getOpportunityTypeName(oppTypeNumber);
        const hasType = selectedTypes.some(type => oppTypeName === type);
        if (!hasType) return false;
      }

      return true;
    });
  }, [opportunities, selectedSkills, selectedLevels, selectedTypes]);

  // Переключатель навыка
  const toggleSkill = (skill) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  // Переключатель уровня
  const toggleLevel = (level) => {
    setSelectedLevels(prev =>
      prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
    );
  };

  // Переключатель типа
  const toggleType = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  // Сброс всех фильтров
  const resetFilters = () => {
    setSelectedSkills([]);
    setSelectedLevels([]);
    setSelectedTypes([]);
  };

  // Подсчёт активных фильтров
  const activeFiltersCount = selectedSkills.length + selectedLevels.length + selectedTypes.length;

  // Проверка, есть ли активные фильтры
  const hasActiveFilters = activeFiltersCount > 0;

  return {
    // Состояния
    selectedSkills,
    selectedLevels,
    selectedTypes,
    
    // Доступные опции
    availableSkills,
    availableLevels: AVAILABLE_LEVELS,
    availableTypes: AVAILABLE_TYPES,
    
    // Отфильтрованные возможности
    filteredOpportunities,
    
    // Статистика
    activeFiltersCount,
    hasActiveFilters,
    
    // Действия
    toggleSkill,
    toggleLevel,
    toggleType,
    resetFilters,
  };
};