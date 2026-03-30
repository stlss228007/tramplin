// src/shared/api/transformers.js
import {
  OPPORTUNITY_TYPE,
  WORK_FORMAT,
  EXPERIENCE_LEVEL,
  MODERATION_STATUS,
} from '@/shared/constants/opportunity';

// ==================== HELPER FUNCTIONS ====================

/**
 * Преобразует строковое значение приватности в число для API
 * @param {string} privacySetting - 'public', 'private', 'contacts'
 * @returns {number} 0, 1, 2
 */
export const privacyToNumber = (privacySetting) => {
  switch (privacySetting) {
    case 'public': return 0;
    case 'private': return 1;
    case 'contacts': return 2;
    default: return 0;
  }
};

/**
 * Преобразует числовое значение приватности из API в строку
 * @param {number} privacyValue - 0, 1, 2
 * @returns {string} 'public', 'private', 'contacts'
 */
export const privacyFromNumber = (privacyValue) => {
  switch (privacyValue) {
    case 0: return 'public';
    case 1: return 'private';
    case 2: return 'contacts';
    default: return 'public';
  }
};

// ==================== OPPORTUNITY TRANSFORMERS ====================

/**
 * Преобразование одиночной возможности из snake_case (API) в camelCase (фронт)
 * @param {Object} apiOpp - Объект возможности от API
 * @returns {Object} Объект возможности для фронта
 */
export const transformOpportunityFromAPI = (apiOpp) => ({
  ID: apiOpp.id,
  EmployerID: apiOpp.employer_id,
  Employer: apiOpp.employer || null,
  CuratorID: apiOpp.curator_id,
  Curator: apiOpp.curator || null,
  Tags: apiOpp.tags || [],
  Title: apiOpp.title,
  Description: apiOpp.description,
  OpportunityType: apiOpp.opportunity_type,
  WorkFormat: apiOpp.work_format,
  LocationCity: apiOpp.location_city,
  Latitude: apiOpp.latitude,
  Longitude: apiOpp.longitude,
  SalaryMin: apiOpp.salary_min,
  SalaryMax: apiOpp.salary_max,
  ExperienceLevel: apiOpp.experience_level,
  ModerationStatus: apiOpp.moderation_status,
  ExpiresAt: apiOpp.expires_at,
  EventDateStart: apiOpp.event_date_start,
  EventDateEnd: apiOpp.event_date_end,
  CreatedAt: apiOpp.created_at,
  UpdatedAt: apiOpp.updated_at,
});

/**
 * Преобразование списка возможностей из API
 * @param {Object} apiResponse - Ответ API с полями opportunities, total, limit, offset
 * @returns {Object} Объект со списком возможностей и пагинацией
 */
export const transformOpportunitiesListFromAPI = (apiResponse) => ({
  opportunities: (apiResponse.opportunities || []).map(transformOpportunityFromAPI),
  total: apiResponse.total || 0,
  limit: apiResponse.limit || 20,
  offset: apiResponse.offset || 0,
});

/**
 * Преобразование возможности из camelCase (фронт) в snake_case (API) для создания/обновления
 * @param {Object} opp - Объект возможности из фронта
 * @returns {Object} Объект для отправки на API
 */
export const transformOpportunityToAPI = (opp) => ({
  tag_names: opp.Tags?.map(t => t.name) || [],
  title: opp.Title,
  description: opp.Description,
  opportunity_type: opp.OpportunityType,
  work_format: opp.WorkFormat,
  location_city: opp.LocationCity,
  latitude: opp.Latitude,
  longitude: opp.Longitude,
  salary_min: opp.SalaryMin,
  salary_max: opp.SalaryMax,
  experience_level: opp.ExperienceLevel,
  expires_at: opp.ExpiresAt,
  event_date_start: opp.EventDateStart,
  event_date_end: opp.EventDateEnd,
});

/**
 * Преобразование данных для обновления возможности (только изменяемые поля)
 * @param {Object} data - Частичный объект возможности
 * @returns {Object} Объект для отправки на PATCH /opportunities/:id
 */
export const transformOpportunityUpdateToAPI = (data) => {
  const result = {};
  if (data.Title !== undefined) result.title = data.Title;
  if (data.Description !== undefined) result.description = data.Description;
  if (data.OpportunityType !== undefined) result.opportunity_type = data.OpportunityType;
  if (data.WorkFormat !== undefined) result.work_format = data.WorkFormat;
  if (data.LocationCity !== undefined) result.location_city = data.LocationCity;
  if (data.Latitude !== undefined) result.latitude = data.Latitude;
  if (data.Longitude !== undefined) result.longitude = data.Longitude;
  if (data.SalaryMin !== undefined) result.salary_min = data.SalaryMin;
  if (data.SalaryMax !== undefined) result.salary_max = data.SalaryMax;
  if (data.ExperienceLevel !== undefined) result.experience_level = data.ExperienceLevel;
  if (data.ExpiresAt !== undefined) result.expires_at = data.ExpiresAt;
  if (data.EventDateStart !== undefined) result.event_date_start = data.EventDateStart;
  if (data.EventDateEnd !== undefined) result.event_date_end = data.EventDateEnd;
  return result;
};

// ==================== APPLICANT TRANSFORMERS ====================

/**
 * Преобразование профиля соискателя из snake_case (API) в camelCase (фронт)
 * @param {Object} apiApplicant - Объект соискателя от API
 * @returns {Object} Объект соискателя для фронта
 */
export const transformApplicantFromAPI = (apiApplicant) => ({
  id: apiApplicant.id,
  email: apiApplicant.email,
  userId: apiApplicant.user_id,
  firstName: apiApplicant.first_name,
  secondName: apiApplicant.second_name,
  lastName: apiApplicant.last_name,
  university: apiApplicant.university,
  graduationYear: apiApplicant.graduation_year,
  about: apiApplicant.about,
  privacySetting: privacyFromNumber(apiApplicant.privacy_setting),
  tags: apiApplicant.tags || [],
  createdAt: apiApplicant.created_at,
  updatedAt: apiApplicant.updated_at,
});

/**
 * Преобразование профиля соискателя из camelCase (фронт) в snake_case (API) для создания
 * @param {Object} applicant - Объект соискателя из фронта
 * @returns {Object} Объект для отправки на POST /auth/register (role=0)
 */
export const transformApplicantToAPI = (applicant) => ({
  first_name: applicant.firstName,
  second_name: applicant.secondName,
  last_name: applicant.lastName,
  university: applicant.university,
  graduation_year: applicant.graduationYear,
  about: applicant.about,
  privacy_setting: privacyToNumber(applicant.privacySetting),
  tag_names: applicant.tags?.map(t => t.name) || [],
});

/**
 * Преобразование данных для обновления профиля соискателя
 * @param {Object} data - Частичный объект профиля соискателя
 * @returns {Object} Объект для отправки на PATCH /applicants/me
 */
export const transformApplicantUpdateToAPI = (data) => {
  const result = {};
  if (data.firstName !== undefined) result.first_name = data.firstName;
  if (data.secondName !== undefined) result.second_name = data.secondName;
  if (data.lastName !== undefined) result.last_name = data.lastName;
  if (data.university !== undefined) result.university = data.university;
  if (data.graduationYear !== undefined) result.graduation_year = data.graduationYear;
  if (data.about !== undefined) result.about = data.about;
  if (data.privacySetting !== undefined) {
    result.privacy_setting = privacyToNumber(data.privacySetting);
  }
  return result;
};

// ==================== EMPLOYER TRANSFORMERS ====================

/**
 * Преобразование профиля работодателя из snake_case (API) в camelCase (фронт)
 * @param {Object} apiEmployer - Объект работодателя от API
 * @returns {Object} Объект работодателя для фронта
 */
export const transformEmployerFromAPI = (apiEmployer) => ({
  id: apiEmployer.id,
  userId: apiEmployer.user_id,
  email: apiEmployer.email,
  companyName: apiEmployer.company_name,
  inn: apiEmployer.inn,
  description: apiEmployer.description,
  website: apiEmployer.website,
  verifiedStatus: apiEmployer.verified_status,
  createdAt: apiEmployer.created_at,
  updatedAt: apiEmployer.updated_at,
});

/**
 * Преобразование профиля работодателя из camelCase (фронт) в snake_case (API) для создания
 * @param {Object} employer - Объект работодателя из фронта
 * @returns {Object} Объект для отправки на POST /auth/register (role=1)
 */
export const transformEmployerToAPI = (employer) => ({
  company_name: employer.companyName,
  inn: employer.inn,
  description: employer.description,
  website: employer.website,
});

/**
 * Преобразование данных для обновления профиля работодателя
 * @param {Object} data - Частичный объект профиля работодателя
 * @returns {Object} Объект для отправки на PATCH /employers/me
 */
export const transformEmployerUpdateToAPI = (data) => {
  const result = {};
  if (data.companyName !== undefined) result.company_name = data.companyName;
  if (data.inn !== undefined) result.inn = data.inn;
  if (data.description !== undefined) result.description = data.description;
  if (data.website !== undefined) result.website = data.website;
  return result;
};

/**
 * Преобразование данных для верификации работодателя (куратор)
 * @param {string} status - 'verified', 'rejected'
 * @returns {Object} Объект для отправки на PUT /employers/:id/verification
 */
export const transformVerificationToAPI = (status) => ({
  status: status === 'verified' ? 'verified' : 'rejected',
});

// ==================== AUTH TRANSFORMERS ====================

/**
 * Преобразование данных для регистрации в зависимости от роли
 * @param {Object} credentials - { email, password }
 * @param {number} role - 0 (applicant) или 1 (employer)
 * @param {Object} profileData - Данные профиля
 * @returns {Object} Объект для отправки на POST /auth/register
 */
export const transformRegisterToAPI = (credentials, role, profileData) => {
  const base = {
    email: credentials.email,
    password: credentials.password,
    role: role,
  };

  if (role === 0) { // Соискатель
    return {
      ...base,
      applicant: transformApplicantToAPI(profileData),
    };
  } else { // Работодатель
    return {
      ...base,
      employer: transformEmployerToAPI(profileData),
    };
  }
};

/**
 * Преобразование ответа авторизации
 * @param {Object} apiResponse - { access_token, user_id, role, is_verified }
 * @returns {Object} Объект для сохранения в localStorage
 */
export const transformAuthResponseFromAPI = (apiResponse) => ({
  accessToken: apiResponse.access_token,
  userId: apiResponse.user_id,
  role: apiResponse.role === 0 ? 'applicant' : apiResponse.role === 1 ? 'employer' : 'curator',
  isVerified: apiResponse.is_verified,
});

// ==================== TAG TRANSFORMERS ====================

/**
 * Преобразование данных для добавления/удаления тегов
 * @param {string[]} tagIds - Массив ID тегов
 * @returns {Object} Объект для отправки на API
 */
export const transformTagsToAPI = (tagIds) => ({
  tag_ids: tagIds,
});

/**
 * Преобразование тега из API в формат фронта
 * @param {Object} apiTag - { id, name }
 * @returns {Object} { id, name }
 */
export const transformTagFromAPI = (apiTag) => ({
  id: apiTag.id,
  name: apiTag.name,
});

// ==================== MODERATION TRANSFORMERS ====================

/**
 * Преобразование данных для обновления статуса модерации
 * @param {number} status - 0 (на модерации), 1 (одобрено), 2 (отклонено)
 * @returns {Object} Объект для отправки на PATCH /opportunities/:id/moderation-status
 */
export const transformModerationStatusToAPI = (status) => ({
  status: status,
});

// ==================== ERROR TRANSFORMERS ====================

/**
 * Преобразование ошибки API в удобный формат
 * @param {Error|Object} error - Ошибка от API или axios
 * @returns {Object} { message, status, details }
 */
export const transformErrorFromAPI = (error) => {
  if (error.response) {
    // Ошибка от сервера
    const { status, data } = error.response;
    return {
      message: data.error || data.message || 'Произошла ошибка',
      status: status,
      details: data,
    };
  }
  if (error.request) {
    // Ошибка сети
    return {
      message: 'Нет соединения с сервером',
      status: 0,
      details: null,
    };
  }
  // Ошибка в коде
  return {
    message: error.message || 'Неизвестная ошибка',
    status: null,
    details: null,
  };
};