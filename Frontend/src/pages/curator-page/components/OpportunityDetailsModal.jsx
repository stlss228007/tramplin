import React from 'react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import styles from '../CuratorPage.module.css';

export const OpportunityDetailsModal = ({ isOpen, onClose, opportunity }) => {
  if (!opportunity) return null;

  const getTypeText = (type) => {
    switch (type) {
      case 'internship': return 'Стажировка';
      case 'mentorship': return 'Менторство';
      default: return 'Вакансия';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Детали возможности" maxWidth="md">
      <div className={styles.detailsContent}>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Название:</span>
          <span className={styles.detailValue}>{opportunity.title}</span>
        </div>
        
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Компания:</span>
          <span className={styles.detailValue}>{opportunity.companyName}</span>
        </div>
        
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Тип:</span>
          <span className={styles.detailValue}>{getTypeText(opportunity.type)}</span>
        </div>
        
        {opportunity.locationCity && (
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Город:</span>
            <span className={styles.detailValue}>{opportunity.locationCity}</span>
          </div>
        )}
        
        {opportunity.salaryMin && opportunity.salaryMax && (
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Зарплата:</span>
            <span className={styles.detailValue}>{opportunity.salaryMin.toLocaleString()} – {opportunity.salaryMax.toLocaleString()} ₽</span>
          </div>
        )}
        
        {opportunity.skills && opportunity.skills.length > 0 && (
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Навыки:</span>
            <div className={styles.detailSkills}>
              {opportunity.skills.map(skill => (
                <span key={skill} className={styles.skillChip}>{skill}</span>
              ))}
            </div>
          </div>
        )}
        
        {opportunity.description && (
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Описание:</span>
            <div className={styles.detailDescription}>{opportunity.description}</div>
          </div>
        )}
        
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Создано:</span>
          <span className={styles.detailValue}>{formatDate(opportunity.submittedAt)}</span>
        </div>
        
        {opportunity.expiresAt && (
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Действительно до:</span>
            <span className={styles.detailValue}>{formatDate(opportunity.expiresAt)}</span>
          </div>
        )}
      </div>
      
      <div className={styles.buttonGroupCenter}>
        <Button className={styles.submitButton} onClick={onClose}>
          Закрыть
        </Button>
      </div>
    </Modal>
  );
};