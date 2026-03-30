import { FIXED_IDS } from '../mock-data';

export const mockApplicant = {
  id: 1,
  user: {
    id: 1,
    email: 'anna.k@student.ru',
    role: 'applicant',
    isVerified: true,
  },
  firstName: 'Анна',
  secondName: 'Дмитриевна',
  lastName: 'Кузнецова',
  university: 'МГТУ им. Баумана',
  faculty: 'ИУ5',
  graduationYear: 2026,
  about: 'Студентка 4 курса, ищу стажировку в области разработки',
  privacySetting: 'public',
  skills: ['Python', 'SQL', 'Django', 'Git', 'Pandas'],
  resume: {
    name: 'frontend_dev_anna.pdf',
    url: '/resumes/anna_k.pdf',
    updatedAt: '2026-03-12T10:00:00Z',
  },
  github: 'https://github.com/anna-dev',
  createdAt: '2026-01-15T10:00:00Z',
  updatedAt: '2026-03-12T10:00:00Z',
};

export const mockApplications = [
  {
    id: 1,
    opportunityId: 2,
    opportunityTitle: 'Java-стажёр',
    companyName: 'VK Tech',
    status: 'accepted',
    appliedAt: '2026-03-10T10:00:00Z',
    updatedAt: '2026-03-15T10:00:00Z',
  },
  {
    id: 2,
    opportunityId: 4,
    opportunityTitle: 'Аналитик данных',
    companyName: 'Тинькофф',
    status: 'pending',
    appliedAt: '2026-03-01T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z',
  },
  {
    id: 3,
    opportunityId: 1,
    opportunityTitle: 'Frontend-стажёр',
    companyName: 'Яндекс',
    status: 'rejected',
    appliedAt: '2026-02-25T10:00:00Z',
    updatedAt: '2026-03-05T10:00:00Z',
  },
  {
    id: 4,
    opportunityId: 2,
    opportunityTitle: 'Test',
    companyName: 'Test',
    status: 'Test',
    appliedAt: 'Test',
    updatedAt: 'Test',
  },
];

export const mockFavorites = [
  {
    id: 1,
    opportunityId: FIXED_IDS.OPPORTUNITY_7,
    opportunityTitle: 'Middle PHP разработчик',
    companyName: 'ООО "Рога и Копыта"',
    savedAt: '2026-03-20T10:00:00Z',
  },
  {
    id: 2,
    opportunityId: FIXED_IDS.OPPORTUNITY_3,
    opportunityTitle: 'Менторская программа: Карьера в IT',
    companyName: 'СберТех',
    savedAt: '2026-03-18T10:00:00Z',
  },
];

export const mockFavoritesAll = [
  {
    id: 1,
    opportunityId: FIXED_IDS.OPPORTUNITY_1,
    opportunityTitle: 'Frontend-разработчик (React)',
    companyName: 'Яндекс',
    savedAt: '2026-03-20T10:00:00Z',
  },
  {
    id: 2,
    opportunityId: FIXED_IDS.OPPORTUNITY_2,
    opportunityTitle: 'Java-стажёр',
    companyName: 'VK Tech',
    savedAt: '2026-03-19T10:00:00Z',
  },
  {
    id: 3,
    opportunityId: FIXED_IDS.OPPORTUNITY_3,
    opportunityTitle: 'Менторская программа: Карьера в IT',
    companyName: 'СберТех',
    savedAt: '2026-03-18T10:00:00Z',
  },
  {
    id: 4,
    opportunityId: FIXED_IDS.OPPORTUNITY_4,
    opportunityTitle: 'Аналитик данных (стажёр)',
    companyName: 'Тинькофф',
    savedAt: '2026-03-17T10:00:00Z',
  },
  {
    id: 5,
    opportunityId: FIXED_IDS.OPPORTUNITY_5,
    opportunityTitle: 'iOS стажировка',
    companyName: 'Ozon',
    savedAt: '2026-03-16T10:00:00Z',
  },
  {
    id: 6,
    opportunityId: FIXED_IDS.OPPORTUNITY_6,
    opportunityTitle: 'DevOps ментор',
    companyName: 'Авито',
    savedAt: '2026-03-15T10:00:00Z',
  },
  {
    id: 7,
    opportunityId: FIXED_IDS.OPPORTUNITY_7,
    opportunityTitle: 'Middle PHP разработчик',
    companyName: 'ООО "Рога и Копыта"',
    savedAt: '2026-03-14T10:00:00Z',
  },
];

export const mockContacts = [
  {
    id: 1,
    applicant: {
      id: 2,
      firstName: 'Илья',
      lastName: 'Соколов',
      skills: ['Java', 'Spring', 'Kotlin'],
    },
    status: 'accepted',
    createdAt: '2026-03-01T10:00:00Z',
  },
  {
    id: 2,
    applicant: {
      id: 3,
      firstName: 'Мария',
      lastName: 'Лебедева',
      skills: ['Python', 'Pandas', 'Tableau'],
    },
    status: 'accepted',
    createdAt: '2026-02-20T10:00:00Z',
  },
  {
    id: 3,
    applicant: {
      id: 4,
      firstName: 'Глеб',
      lastName: 'Ковалёв',
      skills: ['Agile', 'Jira', 'Confluence'],
    },
    status: 'pending',
    createdAt: '2026-03-15T10:00:00Z',
  },
  {
    id: 4,
    applicant: {
      id: 5,
      firstName: 'Test',
      lastName: 'Test',
      skills: ['Test', 'Test', 'Test'],
    },
    status: 'Test',
    createdAt: 'Test',
  },
];

// ✅ Запросы в контакты (входящие)
export const mockContactRequests = [
  {
    id: 'req1',
    fromName: 'Илья С.',
    userId: 2,
    createdAt: '2026-03-22T10:00:00Z',
  },
  {
    id: 'req2',
    fromName: 'Анна П.',
    userId: 3,
    createdAt: '2026-03-20T10:00:00Z',
  },
];

// Устаревшее поле — удалено
// export const mockRecommendations = [...];

export const mockCareerTracker = {
  upcomingEvents: [
    { id: 1, title: 'Хакатон VK', date: '2026-04-25T10:00:00Z' },
    { id: 2, title: 'День карьеры Сбер', date: '2026-04-28T10:00:00Z' },
  ],
  scheduledInterviews: [
    { id: 1, company: 'Яндекс', date: '2026-04-15T11:00:00Z', format: 'online' },
  ],
};