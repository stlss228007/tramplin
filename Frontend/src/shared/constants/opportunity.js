// src/shared/constants/opportunity.js

// Соответствие API: 0 - стажировка, 1 - вакансия, 2 - мероприятие, 3 - менторство
export const OPPORTUNITY_TYPE = {
  0: 'Стажировка',
  1: 'Вакансия',
  2: 'Мероприятие',
  3: 'Менторство',
};

export const WORK_FORMAT = {
  0: 'Офис',
  1: 'Гибрид',
  2: 'Удалённо',
};

// Соответствие API: 0 - без опыта/стажёр, 1 - junior, 2 - middle, 3 - senior
export const EXPERIENCE_LEVEL = {
  0: 'Стажёр',
  1: 'Junior',
  2: 'Middle',
  3: 'Senior',
};

export const MODERATION_STATUS = {
  0: 'На модерации',
  1: 'Подтверждено',
  2: 'Отклонено',
};

// Обратные маппинги для отправки на бэкенд
export const OPPORTUNITY_TYPE_TO_NUMBER = {
  'Стажировка': 0,
  'Вакансия': 1,
  'Мероприятие': 2,
  'Менторство': 3,
};

export const WORK_FORMAT_TO_NUMBER = {
  'Офис': 0,
  'Гибрид': 1,
  'Удалённо': 2,
};

export const EXPERIENCE_LEVEL_TO_NUMBER = {
  'Стажёр': 0,
  'Junior': 1,
  'Middle': 2,
  'Senior': 3,
};

export const MODERATION_STATUS_TO_NUMBER = {
  'На модерации': 0,
  'Подтверждено': 1,
  'Отклонено': 2,
};