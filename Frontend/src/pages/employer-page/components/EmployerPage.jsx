import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  mockEmployerOpportunities,
  mockResponses,
  mockContactProfiles
} from '@/shared/api/mock';
import { CreateOpportunityModal } from './components/CreateOpportunityModal';
import { EditOpportunityModal } from './components/EditOpportunityModal';
import { OpportunitiesCard } from './components/OpportunitiesCard';
import { ResponsesCard } from './components/ResponsesCard';
import { ViewContactProfileModal } from '@/features/profile/ViewContactProfileModal';
import styles from './EmployerPage.module.css';

export const EmployerPage = () => {
  useEffect(() => {
    console.log('Функция handleViewContactProfile определена:', typeof handleViewContactProfile);
  }, []);
  const navigate = useNavigate();
  const [opportunities, setOpportunities] = useState(mockEmployerOpportunities);
  const [responses, setResponses] = useState(mockResponses);
  const [modalData, setModalData] = useState({ isOpen: false, mode: 'create', opportunity: null });
  const [selectedContactProfile, setSelectedContactProfile] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleCreateOpportunity = (newOpportunity) => {
    const newId = Math.max(...opportunities.map(o => o.id), 0) + 1;
    setOpportunities(prev => [{
      ...newOpportunity,
      id: newId,
      status: 'active',
      responsesCount: 0,
      createdAt: new Date().toISOString(),
    }, ...prev]);
  };

  const handleEditOpportunity = (id, updatedData) => {
    setOpportunities(prev => prev.map(opp =>
      opp.id === id ? { ...opp, ...updatedData, updatedAt: new Date().toISOString() } : opp
    ));
  };

  const handleDeleteOpportunity = (id) => {
    if (confirm('Удалить эту возможность?')) {
      setOpportunities(prev => prev.filter(opp => opp.id !== id));
    }
  };

  const handleStatusChange = (responseId, newStatus) => {
    setResponses(prev => prev.map(res =>
      res.id === responseId ? { ...res, status: newStatus } : res
    ));
  };

  const handleRemoveResponse = (responseId) => {
    if (confirm('Удалить этот отклик из списка?')) {
      setResponses(prev => prev.filter(res => res.id !== responseId));
    }
  };

  const openCreateModal = () => {
    setModalData({ isOpen: true, mode: 'create', opportunity: null });
  };

  const openEditModal = (opportunity) => {
    setModalData({ isOpen: true, mode: 'edit', opportunity });
  };

  const closeModal = () => {
    setModalData({ isOpen: false, mode: 'create', opportunity: null });
  };

  // Обработчик просмотра профиля соискателя
  const handleViewContactProfile = React.useCallback((response) => {
    console.log('Вызов handleViewContactProfile с:', response);
    const fullProfile = mockContactProfiles.find(p => p.id === response.applicantId);
    setSelectedContactProfile(fullProfile || {
      ...response,
      privacySetting: 'public',
    });
    setIsProfileModalOpen(true);
  }, [mockContactProfiles, setSelectedContactProfile, setIsProfileModalOpen]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate('/')}>
          <i className="fas fa-arrow-left"></i> На главную
        </button>
        <h1 className={styles.title}>Кабинет работодателя</h1>
        <div className={styles.roleTabs}>
          <button className={styles.roleTab} onClick={() => navigate('/profile/applicant')}>Соискатель</button>
          <button className={`${styles.roleTab} ${styles.active}`}>Работодатель</button>
          <button className={styles.roleTab} onClick={() => navigate('/profile/curator')}>Куратор</button>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <i className="fas fa-plus-circle"></i> Создать возможность
          </div>
          <p>Заполните поля — название, тип, навыки, зарплата, город</p>
          <button className={styles.solidButton} onClick={openCreateModal}>
            <i className="fas fa-pen"></i> Новая вакансия / стажировка
          </button>
        </div>

        <OpportunitiesCard
          opportunities={opportunities}
          onEdit={openEditModal}
          onDelete={handleDeleteOpportunity}
        />

        <ResponsesCard
          responses={responses}
          onStatusChange={handleStatusChange}
          onRemove={handleRemoveResponse}
          onViewContactProfile={handleViewContactProfile || undefined}
        />
      </div>

      <CreateOpportunityModal
        isOpen={modalData.isOpen && modalData.mode === 'create'}
        onClose={closeModal}
        onCreate={handleCreateOpportunity}
      />

      <EditOpportunityModal
        isOpen={modalData.isOpen && modalData.mode === 'edit'}
        onClose={closeModal}
        opportunity={modalData.opportunity}
        onSave={handleEditOpportunity}
      />

      {/* Модалка просмотра профиля соискателя */}
      {isProfileModalOpen && (
        <ViewContactProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          contact={selectedContactProfile}
        />
      )}
    </div>
  );
};