import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import styles from '../CuratorPage.module.css';

export const EditUserModal = ({ isOpen, onClose, user, type, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    university: '',
    graduationYear: '',
    skills: '',
    status: 'active',
    companyName: '',
    inn: '',
    description: '',
    website: '',
  });

  useEffect(() => {
    if (user) {
      if (type === 'applicant') {
        setFormData({
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          university: user.university || '',
          graduationYear: user.graduationYear || '',
          skills: user.skills?.join(', ') || '',
          status: user.status || 'active',
          companyName: '',
          inn: '',
          description: '',
          website: '',
        });
      } else if (type === 'employer') {
        setFormData({
          companyName: user.companyName || '',
          inn: user.inn || '',
          description: user.description || '',
          website: user.website || '',
          status: user.status || 'pending',
          firstName: '',
          lastName: '',
          university: '',
          graduationYear: '',
          skills: '',
        });
      }
    }
  }, [user, type]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === 'applicant') {
      onSave({
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
      });
    } else {
      onSave({
        companyName: formData.companyName,
        inn: formData.inn,
        description: formData.description,
        website: formData.website,
        status: formData.status,
      });
    }
    onClose();
  };

  const getTitle = () => {
    if (type === 'applicant') return `Редактирование профиля соискателя: ${user.name}`;
    if (type === 'employer') return `Редактирование профиля работодателя: ${user.name}`;
    return 'Редактирование профиля';
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={getTitle()} maxWidth="md">
      <form onSubmit={handleSubmit} className={styles.form}>
        {type === 'applicant' ? (
          <>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Имя</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={styles.formInput}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Фамилия</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={styles.formInput}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Вуз</label>
              <input
                type="text"
                name="university"
                value={formData.university}
                onChange={handleChange}
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Год выпуска</label>
              <input
                type="number"
                name="graduationYear"
                value={formData.graduationYear}
                onChange={handleChange}
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Навыки (через запятую)</label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="Python, SQL, React..."
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Статус</label>
              <select name="status" value={formData.status} onChange={handleChange} className={styles.select}>
                <option value="active">Активен</option>
                <option value="suspended">Заморожен</option>
              </select>
            </div>
          </>
        ) : (
          <>
            <div className={styles.formGroup}>
              <label>Название компании</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label>ИНН</label>
              <input
                type="text"
                name="inn"
                value={formData.inn}
                onChange={handleChange}
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Сфера деятельности</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Сайт</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Статус верификации</label>
              <select name="status" value={formData.status} onChange={handleChange} className={styles.select}>
                <option value="pending">На верификации</option>
                <option value="approved">Верифицирован</option>
                <option value="rejected">Отклонён</option>
              </select>
            </div>
          </>
        )}

        <div className={styles.buttonGroupCenter}>
          <Button type="submit" className={styles.submitButton}>
            Сохранить
          </Button>
        </div>
      </form>
    </Modal>
  );
};