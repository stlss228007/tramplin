export const mockCurator = {
  id: 1,
  user: {
    id: 3,
    email: 'a.sokolov@tramplin.ru',
    role: 'curator',
    isVerified: true,
  },
  fullName: 'Алексей Соколов',
  isSuperAdmin: true,
  createdAt: '2026-01-01T10:00:00Z',
  updatedAt: '2026-01-01T10:00:00Z',
};

export const mockPendingCompanies = [
  {
    id: 1,
    companyName: 'ООО "Рога и копыта"',
    inn: '7712345678',
    email: 'hr@roga-kopyta.ru',
    status: 'pending',
    verificationData: {
      innVerified: true,
      corporateEmailVerified: true,
    },
    submittedAt: '2026-03-25T10:00:00Z',
  },
  {
    id: 2,
    companyName: 'ИП Иванов',
    inn: '5009112233',
    email: 'ivanov@mail.ru',
    status: 'pending',
    verificationData: {
      innVerified: false,
      corporateEmailVerified: false,
    },
    submittedAt: '2026-03-26T10:00:00Z',
  },
];

export const mockPendingOpportunities = [
  {
    id: 4,
    title: 'Аналитик данных',
    companyName: 'Тинькофф',
    type: 'internship',
    status: 'pending',
    submittedAt: '2026-03-26T10:00:00Z',
  },
  {
    id: 3,
    title: 'Менторская программа',
    companyName: 'СберТех',
    type: 'mentorship',
    status: 'pending',
    submittedAt: '2026-03-25T10:00:00Z',
  },
];

export const mockAllUsers = {
  applicants: [
    { id: 1, name: 'Анна К.', role: 'applicant', status: 'active' },
    { id: 2, name: 'Петр С.', role: 'applicant', status: 'active' },
    { id: 3, name: 'Елена В.', role: 'applicant', status: 'suspended' },
  ],
  employers: [
    { id: 1, name: 'Яндекс', role: 'employer', status: 'verified' },
    { id: 2, name: 'VK', role: 'employer', status: 'verified' },
    { id: 3, name: 'ООО "Стартап"', role: 'employer', status: 'pending' },
  ],
  curators: [
    { id: 1, name: 'Алексей Соколов', role: 'curator', isSuperAdmin: true },
    { id: 2, name: 'Мария Иванова', role: 'curator', isSuperAdmin: false },
  ],
};