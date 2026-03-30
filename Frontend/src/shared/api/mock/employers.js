import { FIXED_IDS } from './constants';

export const employersList = [
  {
    id: FIXED_IDS.YANDEX_EMPLOYER,
    companyName: 'Яндекс',
    description: 'Крупнейшая IT-компания в России',
    website: 'https://yandex.ru/jobs',
    contactEmail: 'hr@yandex-team.ru',
    contactPhone: '+7 (495) 739-70-00',
    verifiedStatus: 1,
  },
  {
    id: FIXED_IDS.VK_EMPLOYER,
    companyName: 'VK Tech',
    description: 'Технологическая компания',
    website: 'https://vk.com/careers',
    contactEmail: 'internship@vk.team',
    contactPhone: '+7 (812) 123-45-67',
    verifiedStatus: 1,
  },
  {
    id: FIXED_IDS.SBER_EMPLOYER,
    companyName: 'СберТех',
    description: 'Технологическая дочка Сбера',
    website: 'https://sbertech.ru/career',
    contactEmail: 'mentorship@sbertech.ru',
    contactPhone: '+7 (800) 555-35-35',
    verifiedStatus: 1,
  },
  {
    id: FIXED_IDS.TINKOFF_EMPLOYER,
    companyName: 'Тинькофф',
    description: 'Экосистема финансовых и lifestyle сервисов',
    website: 'https://tinkoff.ru/career',
    contactEmail: 'hr@tinkoff.ru',
    contactPhone: '+7 (843) 200-00-00',
    verifiedStatus: 0,
  },
  {
    id: FIXED_IDS.OZON_EMPLOYER,
    companyName: 'Ozon',
    description: 'Маркетплейс',
    website: 'https://corp.ozon.ru/career',
    contactEmail: 'career@ozon.ru',
    contactPhone: '+7 (383) 123-45-67',
    verifiedStatus: 1,
  },
  {
    id: FIXED_IDS.AVITO_EMPLOYER,
    companyName: 'Авито',
    description: 'Классифайд',
    website: 'https://team.avito.ru/',
    contactEmail: 'mentors@avito.ru',
    contactPhone: '+7 (812) 333-22-11',
    verifiedStatus: 1,
  },
  {
    id: FIXED_IDS.ROGA_EMPLOYER,
    companyName: 'ООО Рога и Копыта',
    description: 'Разработка ПО',
    website: 'https://roga-kopyta.ru/career',
    contactEmail: 'hr@roga-kopyta.ru',
    contactPhone: '+7 (495) 555-55-55',
    verifiedStatus: 1,
  },
];

export const getEmployerById = (id) => employersList.find(e => e.id === id);