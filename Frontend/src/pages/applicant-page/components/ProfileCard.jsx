import React from 'react';
import { ResumeUpload } from '@/features/profile';
import styles from '../ApplicantPage.module.css';

export const ProfileCard = ({ 
  applicant, 
  onEdit, 
  onPrivacyChange 
}) => {
  const profile = applicant;
  const privacy = applicant?.privacySetting;
  const resume = applicant?.resume;
  const getPrivacyDescription = () => {
    switch (privacy) {
      case 'public': return 'Ваш профиль видят все авторизованные пользователи';
      case 'private': return 'Ваш профиль видят только вы';
      case 'contacts': return 'Ваш профиль видят только ваши контакты';
      default: return '';
    }
  };

  if (!profile) {
    return (
      <div className={styles.card}>
        <div className={styles.cardTitle}>
          <i className="fas fa-id-card"></i> Мой профиль
        </div>
        <div className={styles.infoRow}>Загрузка профиля...</div>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>
        <i className="fas fa-id-card"></i> Мой профиль
        <button className={styles.editButton} onClick={onEdit}>
          <i className="fas fa-pen"></i>
        </button>
      </div>
      <div className={styles.infoRow}>
        <strong>ФИО:</strong> {profile?.lastName} {profile?.firstName} {profile?.secondName}
      </div>
      <div className={styles.infoRow}>
        <strong>Вуз:</strong> {profile?.university}, {profile?.faculty}
      </div>
      <div className={styles.infoRow}>
        <strong>Курс / год выпуска:</strong> {profile?.graduationYear}
      </div>
      <div className={styles.skills}>
        <strong>Ключевые навыки:</strong>
        <div className={styles.skillTags}>
          {profile?.skills?.map((skill) => (
            <span key={skill} className={styles.skillTag}>{skill}</span>
          ))}
        </div>
      </div>
      <div className={styles.github}>
        <i className="fab fa-github"></i> {profile?.github}
      </div>

      <div className={styles.privacySection}>
        <div className={styles.privacyLabel}>👁️ Приватность профиля</div>
        <div className={styles.privacyToggle}>
          <button 
            className={`${styles.privacyOption} ${privacy === 'public' ? styles.active : ''}`} 
            onClick={() => onPrivacyChange('public')}
          >
            Все авторизованные
          </button>
          <button 
            className={`${styles.privacyOption} ${privacy === 'private' ? styles.active : ''}`} 
            onClick={() => onPrivacyChange('private')}
          >
            Только я
          </button>
          <button 
            className={`${styles.privacyOption} ${privacy === 'contacts' ? styles.active : ''}`} 
            onClick={() => onPrivacyChange('contacts')}
          >
            Только контакты
          </button>
        </div>
        <p className={styles.privacyDescription}>
          {getPrivacyDescription()}
        </p>
      </div>
    </div>
  );
};