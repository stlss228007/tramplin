import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModal } from '@/shared/hooks/useModal';
import { ROUTES } from '@/shared/constants/routes';
import {
  mockEmployer,
  mockEmployerOpportunities,
  mockResponses,
} from '@/shared/api/mock';
import { CreateOpportunityModal } from './components/CreateOpportunityModal';
import { EditOpportunityModal } from './components/EditOpportunityModal';
import { EditCompanyModal } from './components/EditCompanyModal';
import { CompanyProfileCard } from './components/CompanyProfileCard';
import { OpportunitiesCard } from './components/OpportunitiesCard';
import { ResponsesCard } from './components/ResponsesCard';
import { ViewContactProfileModal } from '@/features/profile/ViewContactProfileModal';
import { OpportunityDetailsModal } from '@/features/opportunity-details/OpportunityDetailsModal';
import styles from './EmployerPage.module.css';

export const EmployerPage = () => {
  const navigate = useNavigate();
  const [company, setCompany] = useState(mockEmployer);
  const [opportunities, setOpportunities] = useState(mockEmployerOpportunities);
  const [responses, setResponses] = useState(mockResponses);
  
  const createModal = useModal();
  const editModal = useModal();
  const editCompanyModal = useModal();
  const viewContactModal = useModal();
  const viewOpportunityModal = useModal();
  
  const [editingOpportunity, setEditingOpportunity] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

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

  const handleEditCompany = (updatedData) => {
    setCompany(prev => ({ ...prev, ...updatedData, updatedAt: new Date().toISOString() }));
  };

  const openEditModal = (opportunity) => {
    setEditingOpportunity(opportunity);
    editModal.open();
  };

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
        <h1 className={styles.title}>Кабинет работодателя</h1>
        <button className={styles.logoutButtonRed} onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i> Выйти
        </button>
      </div>

      <div className={styles.grid}>
        <CompanyProfileCard
          company={company}
          onEdit={editCompanyModal.open}
        />

        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <i className="fas fa-plus-circle"></i> Создать возможность
          </div>
          <p>Заполните поля — название, тип, навыки, зарплата, город</p>
          <button className={styles.solidButton} onClick={createModal.open}>
            <i className="fas fa-pen"></i> Новая вакансия / стажировка
          </button>
        </div>

        <OpportunitiesCard
          opportunities={opportunities}
          onEdit={openEditModal}
          onDelete={handleDeleteOpportunity}
          onShowDetails={(opportunity) => {
            setSelectedOpportunity(opportunity);
            viewOpportunityModal.open();
          }}
        />

        <ResponsesCard
          responses={responses}
          onStatusChange={handleStatusChange}
          onRemove={handleRemoveResponse}
          onViewContactProfile={(contact) => {
            setSelectedContact(contact);
            viewContactModal.open();
          }}
        />
      </div>

      <CreateOpportunityModal
        isOpen={createModal.isOpen}
        onClose={createModal.close}
        onCreate={handleCreateOpportunity}
      />

      <EditOpportunityModal
        isOpen={editModal.isOpen}
        onClose={editModal.close}
        opportunity={editingOpportunity}
        onSave={handleEditOpportunity}
      />

      <EditCompanyModal
        isOpen={editCompanyModal.isOpen}
        onClose={editCompanyModal.close}
        company={company}
        onSave={handleEditCompany}
      />

      <ViewContactProfileModal
        isOpen={viewContactModal.isOpen}
        onClose={viewContactModal.close}
        contact={selectedContact}
      />

      <OpportunityDetailsModal
        formattedData={selectedOpportunity}
        isOpen={viewOpportunityModal.isOpen}
        onClose={viewOpportunityModal.close}
        isSaved={false}
        onSaveToggle={() => {}}
      />
    </div>
  );
};