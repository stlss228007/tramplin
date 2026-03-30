// src/shared/lib/opportunityHelpers.js
import {
  OPPORTUNITY_TYPE,
  WORK_FORMAT,
  EXPERIENCE_LEVEL,
  MODERATION_STATUS,
} from '@/shared/constants/opportunity';

export const getOpportunityTypeName = (value) => {
  // Теперь value: 0=Стажировка, 1=Вакансия, 2=Мероприятие, 3=Менторство
  return OPPORTUNITY_TYPE[value] || 'Не указан';
};

export const getWorkFormatName = (value) => {
  return WORK_FORMAT[value] || 'Не указан';
};

export const getExperienceLevelName = (value) => {
  // Теперь value: 0=Стажёр, 1=Junior, 2=Middle, 3=Senior
  return EXPERIENCE_LEVEL[value] || 'Не указан';
};

export const getModerationStatusName = (value) => {
  return MODERATION_STATUS[value] || 'Не указан';
};