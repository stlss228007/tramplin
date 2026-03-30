import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import styles from '../EmployerPage.module.css';

export const EditCompanyModal = ({ isOpen, onClose, company, onSave }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    inn: '',
    description: '',
    website: '',
    telegram: '',
    address: '',
  });

  useEffect(() => {
    if (company) {
      setFormData({
        companyName: company.companyName || '',
        inn: company.inn || '',
        description: company.description || '',
        website: company.website || '',
        telegram: company.telegram || '',
        address: company.address || '',
      });
    }
  }, [company]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Редактирование профиля" maxWidth="md">
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Название компании *</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>ИНН *</label>
          <input
            type="text"
            name="inn"
            value={formData.inn}
            onChange={handleChange}
            required
            placeholder="10 или 12 цифр"
            pattern="\d{10}|\d{12}"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Сфера деятельности</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Например: IT, интернет-сервисы"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Сайт</label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="https://example.com"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Telegram</label>
          <input
            type="text"
            name="telegram"
            value={formData.telegram}
            onChange={handleChange}
            placeholder="@username"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Адрес</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Город, улица, дом"
          />
        </div>

        <div className={styles.buttonGroupCenter}>
          <Button type="submit" className={styles.submitButton}>
            Сохранить
          </Button>
        </div>
      </form>
    </Modal>
  );
};