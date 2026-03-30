import React from 'react';
import { Button } from '@/components/ui/button';
import styles from '../EmployerPage.module.css';

export const CompanyProfileCard = ({ company, onEdit }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>
        <i className="fas fa-building"></i> Мой профиль
        <button className={styles.editButton} onClick={onEdit}>
          <i className="fas fa-pen"></i>
        </button>
      </div>
      <div className={styles.infoRow}>
        <strong>Компания:</strong> {company.companyName}
      </div>
      <div className={styles.verifiedRow}>
        <strong>Статус:</strong>
        <span className={`${styles.verifiedBadge} ${company.verifiedStatus === 'approved' ? styles.verified : styles.pending}`}>
          {company.verifiedStatus === 'approved' ? 'верифицирован ✓' : 'на верификации'}
        </span>
      </div>
      <div className={styles.infoRow}>
        <strong>ИНН:</strong> {company.inn}
      </div>
      <div className={styles.infoRow}>
        <strong>Сфера деятельности:</strong> {company.description}
      </div>
      <div className={styles.infoRow}>
        <strong>Сайт:</strong> 
        <a href={company.website} target="_blank" rel="noopener noreferrer" className={styles.companyLink}>
          {company.website}
        </a>
      </div>
      <div className={styles.infoRow}>
        <strong>Telegram:</strong> {company.telegram}
      </div>
      <div className={styles.infoRow}>
        <strong>Адрес:</strong> {company.address}
      </div>
    </div>
  );
};