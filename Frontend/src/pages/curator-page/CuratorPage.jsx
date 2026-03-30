import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import {
  mockPendingCompanies,
  mockPendingOpportunities,
  mockAllUsers,
} from '@/shared/api/mock';
import { CompaniesModerationCard } from './components/CompaniesModerationCard';
import { OpportunitiesModerationCard } from './components/OpportunitiesModerationCard';
import { EditUserModal } from './components/EditUserModal';
import { OpportunityDetailsModal } from './components/OpportunityDetailsModal';
import styles from './CuratorPage.module.css';

export const CuratorPage = () => {
  const navigate = useNavigate();
  
  const getCurrentUser = () => {
    const storedUser = localStorage.getItem('currentUser');
    console.log('=== CuratorPage Debug ===');
    console.log('Raw storedUser from localStorage:', storedUser);
    
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log('Parsed user:', parsedUser);
      console.log('User email:', parsedUser.email);
      
      if (parsedUser.email === 'admin@demo.com') {
        console.log('Admin detected - isSuperAdmin: false');
        return {
          id: 3,
          email: 'admin@demo.com',
          role: 'curator',
          isSuperAdmin: false,
          profile: { fullName: 'Иван Иванов' }
        };
      } else if (parsedUser.email === 'superadmin@demo.com') {
        console.log('Superadmin detected - isSuperAdmin: true');
        return {
          id: 4,
          email: 'superadmin@demo.com',
          role: 'curator',
          isSuperAdmin: true,
          profile: { fullName: 'Алексей Алексеев' }
        };
      }
      console.log('Other user detected - isSuperAdmin:', parsedUser.isSuperAdmin);
      return parsedUser;
    }
    
    console.log('No stored user found, using default superadmin');
    return {
      id: 4,
      email: 'superadmin@demo.com',
      role: 'curator',
      isSuperAdmin: true,
      profile: { fullName: 'Алексей Алексеев' }
    };
  };

  const [currentUser] = useState(getCurrentUser());
  const [companies, setCompanies] = useState(mockPendingCompanies);
  const [opportunities, setOpportunities] = useState(mockPendingOpportunities);
  const [applicants, setApplicants] = useState(mockAllUsers.applicants);
  const [employers, setEmployers] = useState(mockAllUsers.employers);
  const [curators, setCurators] = useState(mockAllUsers.curators);
  const [editUserModal, setEditUserModal] = useState({ isOpen: false, user: null, type: null });
  const [detailsModal, setDetailsModal] = useState({ isOpen: false, opportunity: null });
  const [addCuratorModal, setAddCuratorModal] = useState(false);
  const [curatorId, setCuratorId] = useState('');

  useEffect(() => {
    console.log('Current user final:', currentUser);
    console.log('isSuperAdmin final:', currentUser?.isSuperAdmin);
    
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const handleApproveCompany = (companyId) => {
    setCompanies(prev => prev.filter(c => c.id !== companyId));
  };

  const handleRejectCompany = (companyId) => {
    setCompanies(prev => prev.filter(c => c.id !== companyId));
  };

  const handleApproveOpportunity = (opportunityId) => {
    setOpportunities(prev => prev.filter(o => o.id !== opportunityId));
  };

  const handleRejectOpportunity = (opportunityId) => {
    setOpportunities(prev => prev.filter(o => o.id !== opportunityId));
  };

  const handleViewOpportunityDetails = (opportunity) => {
    setDetailsModal({ isOpen: true, opportunity });
  };

  const handleEditUser = (user, type) => {
    setEditUserModal({ isOpen: true, user, type });
  };

  const handleSaveApplicant = (updatedData) => {
    setApplicants(prev => prev.map(a => 
      a.id === editUserModal.user.id ? { ...a, ...updatedData } : a
    ));
  };

  const handleSaveEmployer = (updatedData) => {
    setEmployers(prev => prev.map(e => 
      e.id === editUserModal.user.id ? { ...e, ...updatedData } : e
    ));
  };

  const handleCloseEditModal = () => {
    setEditUserModal({ isOpen: false, user: null, type: null });
  };

  const handleCloseDetailsModal = () => {
    setDetailsModal({ isOpen: false, opportunity: null });
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const isSuperAdmin = currentUser?.isSuperAdmin === true;
  console.log('Rendering - isSuperAdmin value for button:', isSuperAdmin);

  if (!currentUser) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate('/')}>  
          <i className="fas fa-arrow-left"></i> На главную
        </button>
        <h1 className={styles.title}>Кабинет куратора</h1>
        <button className={styles.logoutButtonRed} onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i> Выйти
        </button>
      </div>

      <div className={styles.grid}>
        <CompaniesModerationCard
          companies={companies}
          onApprove={handleApproveCompany}
          onReject={handleRejectCompany}
        />

        <OpportunitiesModerationCard
          opportunities={opportunities}
          onApprove={handleApproveOpportunity}
          onReject={handleRejectOpportunity}
          onViewDetails={handleViewOpportunityDetails}
        />
      </div>

      {isSuperAdmin && (
        <div className={styles.createCuratorSectionWrapper}>
          <button className={styles.createCuratorButton} onClick={() => setAddCuratorModal(true)}>
            <i className="fas fa-plus"></i> Добавить куратора
          </button>
        </div>
      )}

      <EditUserModal
        isOpen={editUserModal.isOpen}
        onClose={handleCloseEditModal}
        user={editUserModal.user}
        type={editUserModal.type}
        onSave={editUserModal.type === 'applicant' ? handleSaveApplicant : handleSaveEmployer}
      />

      <OpportunityDetailsModal
        isOpen={detailsModal.isOpen}
        onClose={handleCloseDetailsModal}
        opportunity={detailsModal.opportunity}
      />

      <Modal
        isOpen={addCuratorModal}
        onClose={() => setAddCuratorModal(false)}
        title="Добавить куратора"
        maxWidth="sm"
      >
        <input
          type="text"
          placeholder="ID пользователя"
          className={styles.modalInput}
          value={curatorId}
          onChange={(e) => setCuratorId(e.target.value)}
        />
        <div className={styles.buttonGroupCenter}>
          <Button className={styles.submitButton}>
            Добавить
          </Button>
          <Button variant="outline" className={styles.submitButton} onClick={() => setAddCuratorModal(false)}>
            Закрыть
          </Button>
        </div>
      </Modal>
    </div>
  );
};