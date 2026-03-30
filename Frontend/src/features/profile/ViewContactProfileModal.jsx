import React from 'react';
import styles from './ViewContactProfileModal.module.css';

export const ViewContactProfileModal = ({ isOpen, onClose, contact }) => {
  if (!isOpen) return null;

  const isProfileVisible = contact?.privacySetting === 'public';

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalCloseButton} onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        
        <h3 className={styles.modalTitle}>Профиль контакта</h3>
        
        {isProfileVisible ? (
          <div className={styles.form}>
            <div className={styles.formGroup}>
              <label>Фамилия</label>
              <div className={styles.profileValue}>{contact?.lastName}</div>
            </div>

            <div className={styles.formGroup}>
              <label>Имя</label>
              <div className={styles.profileValue}>{contact?.firstName}</div>
            </div>

            <div className={styles.formGroup}>
              <label>Отчество</label>
              <div className={styles.profileValue}>{contact?.secondName || '-'}</div>
            </div>

            <div className={styles.formGroup}>
              <label>Вуз</label>
              <div className={styles.profileValue}>{contact?.university || '-'}</div>
            </div>

            <div className={styles.formGroup}>
              <label>Факультет</label>
              <div className={styles.profileValue}>{contact?.faculty || '-'}</div>
            </div>

            <div className={styles.formGroup}>
              <label>Год выпуска</label>
              <div className={styles.profileValue}>{contact?.graduationYear || '-'}</div>
            </div>

            <div className={styles.formGroup}>
              <label>Ключевые навыки</label>
              <div className={styles.profileValue}>
                {contact?.skills?.length > 0 ? contact?.skills.join(', ') : '-'}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>GitHub</label>
              <div className={styles.profileValue}>
                {contact?.github ? (
                  <a href={contact?.github} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    {contact?.github}
                  </a>
                ) : '-'}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Резюме</label>
              <div className={styles.profileValue}>
                {contact?.resume || '-'}
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.privateProfileMessage}>
            Профиль недоступен. Настройки приватности не позволяют просматривать профиль.
          </div>
        )}
      </div>
    </div>
  );
};