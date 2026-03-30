import { useState } from 'react';
import { formatSalary, formatDate, getOpportunityTypeName, getWorkFormatName, getExperienceLevelName, getModerationStatusName } from '@/shared/lib';

export const useOpportunityDetails = (opportunity) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  if (!opportunity) {
    return { isOpen, openModal, closeModal, formattedData: null };
  }

  const {
    ID,
    Title,
    OpportunityType,
    WorkFormat,
    LocationCity,
    Employer,
    Description,
    Tags = [],
    SalaryMin,
    SalaryMax,
    ExpiresAt,
    CreatedAt,
    ExperienceLevel,
    ModerationStatus,
    EventDateStart,
    EventDateEnd,
  } = opportunity;

  const companyName = Employer?.companyName || 'Не указана';
  const contactEmail = Employer?.contactEmail;
  const contactPhone = Employer?.contactPhone;
  const website = Employer?.website;
  const skills = Tags.map(tag => tag.name);

  const formattedData = {
    id: ID,
    title: Title,
    type: getOpportunityTypeName(OpportunityType),
    workFormat: getWorkFormatName(WorkFormat),
    location: LocationCity,
    company: companyName,
    description: Description,
    skills,
    salary: formatSalary(SalaryMin, SalaryMax),
    expiresAt: formatDate(ExpiresAt),
    publishedAt: formatDate(CreatedAt),
    eventDates: EventDateStart && EventDateEnd 
      ? `${formatDate(EventDateStart)} – ${formatDate(EventDateEnd)}`
      : null,
    contacts: {
      email: contactEmail,
      phone: contactPhone,
      website,
    },
    experienceLevel: getExperienceLevelName(ExperienceLevel),
    moderationStatus: getModerationStatusName(ModerationStatus),
  };

  return {
    isOpen,
    openModal,
    closeModal,
    formattedData,
  };
};