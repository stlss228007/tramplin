// src/entities/opportunity/opportunity.types.js

/**
 * @typedef {Object} Tag
 * @property {string} id - UUID
 * @property {string} name - Название тега
 */

/**
 * @typedef {Object} Employer
 * @property {string} id - UUID
 * @property {string} companyName
 * @property {string} description
 * @property {string} website
 * @property {string} contactEmail
 * @property {string} contactPhone
 * @property {number} verifiedStatus - 0=на модерации, 1=подтверждено, 2=отклонено
 */

/**
 * @typedef {Object} Opportunity
 * @property {string} ID - UUID
 * @property {string|null} EmployerID - UUID работодателя
 * @property {Employer|null} Employer - данные работодателя
 * @property {string|null} CuratorID - UUID куратора
 * @property {Object|null} Curator - данные куратора
 * @property {Tag[]} Tags - массив тегов (навыков)
 * @property {string} Title - название позиции
 * @property {string} Description - описание
 * @property {number} OpportunityType - тип: 0=Вакансия, 1=Стажировка, 2=Менторство, 3=Мероприятие
 * @property {number} WorkFormat - формат: 0=Офис, 1=Гибрид, 2=Удалённо
 * @property {string} LocationCity - город
 * @property {number} Latitude - широта
 * @property {number} Longitude - долгота
 * @property {number|null} SalaryMin - минимальная зарплата
 * @property {number|null} SalaryMax - максимальная зарплата
 * @property {number} ExperienceLevel - уровень: 0=Junior, 1=Middle, 2=Senior, 3=Стажёр
 * @property {number} ModerationStatus - статус модерации: 0=на модерации, 1=подтверждено, 2=отклонено
 * @property {string|null} ExpiresAt - дата истечения (ISO)
 * @property {string|null} EventDateStart - дата начала мероприятия (ISO)
 * @property {string|null} EventDateEnd - дата окончания мероприятия (ISO)
 * @property {string} CreatedAt - дата создания (ISO)
 * @property {string} UpdatedAt - дата обновления (ISO)
 * @property {boolean} isSaved - в избранном или нет (поле для фронта)
 */