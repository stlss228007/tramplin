import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileCard } from './components/ProfileCard';
import { ResponsesCard } from './components/ResponsesCard';
import { useOpportunityDetails, OpportunityDetailsModal } from '@/features/opportunity-details';
import { ContactsCard } from './components/ContactsCard';
import { CareerTrackerCard } from './components/CareerTrackerCard';
import { Button } from '@/components/ui/button';
import { EditProfileModal } from '@/features/profile/EditProfileModal';
import { ViewContactProfileModal } from '@/features/profile/ViewContactProfileModal';
import { ResumeUpload } from '@/features/profile/ResumeUpload';
import { ROUTES } from '@/shared/constants/routes';
import { useFavorites } from '@/features/favorites';
import styles from './ApplicantPage.module.css';

import {
  mockApplicant,
  mockApplications,
  mockFavorites,
  mockFavoritesAll,
  mockContacts,
  mockContactRequests,
  mockCareerTracker,
  mockContactProfiles,
  opportunities,
  FIXED_IDS
} from '@/shared/api/mock';

export const ApplicantPage = () => {
  const [applicant, setApplicant] = useState(mockApplicant);
  const [applications, setApplications] = useState(mockApplications);
  const [favorites, setFavorites] = useState(mockFavorites);
  const [contacts, setContacts] = useState(mockContacts);
  const [contactRequests, setContactRequests] = useState(mockContactRequests);
  const [careerTracker, setCareerTracker] = useState(mockCareerTracker);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedContactProfile, setSelectedContactProfile] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [isOpportunityModalOpen, setIsOpportunityModalOpen] = useState(false);

  const { toggleFavorite, isFavorite } = useFavorites();

  const handleShowOpportunity = (opportunity) => {
    console.log('handleShowOpportunity called with:', opportunity);
    if (!opportunity?.opportunityId) {
      console.error('Invalid opportunity object:', opportunity);
      return;
    }
    console.log('Searching for opportunity with ID:', opportunity.opportunityId);
    let fullOpportunity = opportunities.find(o => o.ID === opportunity.opportunityId);
    if (!fullOpportunity) {
      console.error('Opportunity not found for ID:', opportunity.opportunityId);
      const mockApp = mockApplications.find(app => app.id === opportunity.id);
      console.log('Mock application found:', mockApp);
      if (mockApp) {
        console.log('Searching full opportunity for opportunityId:', mockApp.opportunityId);
        const opportunityKey = 'OPPORTUNITY_' + mockApp.opportunityId;
        const opportunityId = FIXED_IDS[opportunityKey];
        console.log('Looking for opportunity with key:', opportunityKey, 'and ID:', opportunityId);
        fullOpportunity = opportunities.find(o => o.ID === opportunityId);
        if (!fullOpportunity) {
          console.error('Failed to find full opportunity. Checking if ID exists in opportunities array.');
          const idExists = opportunities.some(o => o.ID === opportunityId);
          console.log('Opportunity ID exists in opportunities array:', idExists);
          if (!idExists) {
            console.log('Available opportunity IDs:', opportunities.map(o => o.ID));
          }
        }
      } else {
        console.error('Application not found for opportunity:', opportunity);
        return;
      }
    }
    setSelectedOpportunity(fullOpportunity);
    setIsOpportunityModalOpen(true);
  };

  const { formattedData } = useOpportunityDetails(selectedOpportunity);

  const handleCloseOpportunityModal = () => {
    setIsOpportunityModalOpen(false);
    setSelectedOpportunity(null);
  };

  const handleSaveProfile = (data) => {
    setApplicant((prev) => ({ ...prev, ...data }));
    setShowEditModal(false);
  };

  const handlePrivacyChange = (value) => {
    setApplicant((prev) => ({ ...prev, privacySetting: value }));
  };

  const handleRemoveApplication = (id) => {
    setApplications(applications.filter((app) => app.id !== id));
  };

  const handleRemoveFavorite = (id) => {
    setFavorites(favorites.filter((fav) => fav.id !== id));
  };

  const handleAddContact = (user) => {
    const newContact = {
      id: Date.now(),
      applicant: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        skills: user.skills.slice(0, 3),
      },
      status: 'accepted',
      createdAt: new Date().toISOString(),
    };
    setContacts((prev) => [...prev, newContact]);
  };

  const handleRemoveContact = (id) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  const handleAcceptRequest = (requestId) => {
    const request = contactRequests.find((r) => r.id === requestId);
    if (!request) return;

    const mockUser = {
      id: request.userId,
      firstName: request.fromName.split(' ')[0],
      lastName: request.fromName.split(' ')[1] || 'Test',
      skills: ['JavaScript', 'React'],
    };

    const newContact = {
      id: Date.now(),
      applicant: mockUser,
      status: 'accepted',
      createdAt: new Date().toISOString(),
    };

    setContacts((prev) => [...prev, newContact]);
    setContactRequests((prev) => prev.filter((r) => r.id !== requestId));
  };

  const handleRejectRequest = (requestId) => {
    setContactRequests((prev) => prev.filter((r) => r.id !== requestId));
  };

  const handleViewContactProfile = (contact) => {
    const fullProfile = mockContactProfiles.find(p => p.id === contact.applicant.id);
    setSelectedContactProfile(fullProfile || {
      ...contact.applicant,
      privacySetting: 'public',
    });
    setIsProfileModalOpen(true);
  };

  const addEvent = (event) => {
    setCareerTracker((prev) => ({
      ...prev,
      upcomingEvents: [...prev.upcomingEvents, { ...event, id: Date.now() }],
    }));
  };

  const removeEvent = (id) => {
    setCareerTracker((prev) => ({
      ...prev,
      upcomingEvents: prev.upcomingEvents.filter((e) => e.id !== id),
    }));
  };

  const addInterview = (interview) => {
    setCareerTracker((prev) => ({
      ...prev,
      scheduledInterviews: [...prev.scheduledInterviews, { ...interview, id: Date.now() }],
    }));
  };

  const removeInterview = (id) => {
    setCareerTracker((prev) => ({
      ...prev,
      scheduledInterviews: prev.scheduledInterviews.filter((i) => i.id !== id),
    }));
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate(ROUTES.HOME)}>
          <i className="fas fa-arrow-left"></i> На главную
        </button>
        <h1 className={styles.title}>Личный кабинет соискателя</h1>
        <button className={styles.logoutButtonRed} onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i> Выйти
        </button>
      </div>

      <div className={styles.grid}>
        <ProfileCard
          applicant={applicant}
          onEdit={() => setShowEditModal(true)}
          onPrivacyChange={handlePrivacyChange}
        />

        <ResponsesCard
          applications={applications}
          favorites={favorites}
          onRemoveApplication={handleRemoveApplication}
          onRemoveFavorite={handleRemoveFavorite}
          onShowDetails={handleShowOpportunity}
        />

        <ContactsCard
          contacts={contacts}
          contactRequests={contactRequests}
          onAddContact={handleAddContact}
          onRemoveContact={handleRemoveContact}
          onAcceptRequest={handleAcceptRequest}
          onRejectRequest={handleRejectRequest}
          onViewContactProfile={handleViewContactProfile}
        />

        <CareerTrackerCard
          events={careerTracker.upcomingEvents}
          interviews={careerTracker.scheduledInterviews}
          onAddEvent={addEvent}
          onRemoveEvent={removeEvent}
          onAddInterview={addInterview}
          onRemoveInterview={removeInterview}
        />
      </div>

      {showEditModal && (
        <EditProfileModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          profile={applicant}
          onSave={handleSaveProfile}
        />
      )}

      {isProfileModalOpen && (
        <ViewContactProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          contact={selectedContactProfile}
        />
      )}

      {isOpportunityModalOpen && (
        <OpportunityDetailsModal
          formattedData={formattedData}
          isOpen={isOpportunityModalOpen}
          onClose={handleCloseOpportunityModal}
          isSaved={selectedOpportunity ? isFavorite(selectedOpportunity.ID) : false}
          onSaveToggle={toggleFavorite}
        />
      )}
    </div>
  );
};