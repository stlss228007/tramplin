import React from 'react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { showToast } from '@/shared/lib/toast';
import styles from './OpportunityDetailsModal.module.css';

export const OpportunityDetailsModal = ({ formattedData, isOpen, onClose, isSaved, onSaveToggle }) => {
  if (!isOpen || !formattedData) return null;

  const {
    title,
    type,
    workFormat,
    location,
    company,
    description,
    skills = [],
    salary,
    expiresAt,
    contacts,
    experienceLevel,
    eventDates,
    moderationStatus,
    id,
  } = formattedData;

  const handleSaveClick = () => {
    onSaveToggle?.(id);
  };

  const handleRespondClick = () => {
    showToast('✓ Отклик отправлен! Работодатель свяжется с вами.', 'success');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="lg" showCloseButton={true}>
      <VisuallyHidden>
        <h2>{title}</h2>
        <p>Детальная информация о {type?.toLowerCase() || 'возможности'}</p>
      </VisuallyHidden>

      <div className={styles.modalContent}>
        <div className={styles.title}>{title}</div>
        <div className={styles.companyInfo}>
          <i className="far fa-building"></i> {company} · {type}
        </div>

        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <div className={styles.infoLabel}>Формат</div>
            <div className={styles.infoValue}>{workFormat || 'Не указан'}</div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoLabel}>Уровень</div>
            <div className={styles.infoValue}>{experienceLevel || 'Не указан'}</div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoLabel}>Город</div>
            <div className={styles.infoValue}>{location || 'Не указан'}</div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoLabel}>Действует до</div>
            <div className={styles.infoValue}>{expiresAt || 'Не указано'}</div>
          </div>
        </div>

        <div className={styles.field}>
          <strong>💰 Зарплата</strong>
          <div>{salary}</div>
        </div>

        <div className={styles.field}>
          <strong>📋 Описание</strong>
          <div className="whitespace-pre-wrap">{description}</div>
        </div>

        {skills.length > 0 && (
          <>
            <div className={styles.sectionTitle}>Навыки</div>
            <div className={styles.tags}>
              {skills.map((skill) => (
                <span key={skill} className={styles.tag}>{skill}</span>
              ))}
            </div>
          </>
        )}

        {eventDates && (
          <div className={styles.field}>
            <strong>🎉 Даты мероприятия</strong>
            <div>{eventDates}</div>
          </div>
        )}

        <div className={styles.statusRow}>
          <span>{moderationStatus}</span>
        </div>

        {(contacts.email || contacts.phone || contacts.website) && (
          <div className={styles.contacts}>
            {contacts.email && (
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <i className="fas fa-envelope"></i>
                </div>
                <a href={`mailto:${contacts.email}`} className={styles.contactLink}>
                  {contacts.email}
                </a>
              </div>
            )}
            {contacts.phone && (
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <i className="fas fa-phone-alt"></i>
                </div>
                <a href={`tel:${contacts.phone}`} className={styles.contactLink}>
                  {contacts.phone}
                </a>
              </div>
            )}
            {contacts.website && (
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <i className="fas fa-globe"></i>
                </div>
                <a href={contacts.website} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                  {contacts.website}
                </a>
              </div>
            )}
          </div>
        )}

        <div className={styles.buttonGroup}>
          <button className={styles.primaryButton} onClick={handleRespondClick}>
            <i className="fas fa-paper-plane mr-2"></i>
            Откликнуться
          </button>
          <button className={styles.secondaryButton} onClick={handleSaveClick}>
            <i className={`${isSaved ? "fas" : "far"} fa-bookmark mr-2`}></i>
            {isSaved ? "В избранном" : "В избранное"}
          </button>
        </div>
      </div>
    </Modal>
  );
};