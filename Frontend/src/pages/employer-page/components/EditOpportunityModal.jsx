import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { mockAvailableTags } from '@/shared/api/mock';
import styles from '../EmployerPage.module.css';

export const EditOpportunityModal = ({ isOpen, onClose, opportunity, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'Вакансия',
    workFormat: 'Гибрид',
    locationCity: '',
    salaryMin: '',
    salaryMax: '',
    skills: [],
    expiresAt: '',
    description: '',
  });
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skillSearch, setSkillSearch] = useState('');

  useEffect(() => {
    if (opportunity) {
      setFormData({
        title: opportunity.title || '',
        type: opportunity.type || 'Вакансия',
        workFormat: opportunity.workFormat || 'Гибрид',
        locationCity: opportunity.locationCity || '',
        salaryMin: opportunity.salaryMin || '',
        salaryMax: opportunity.salaryMax || '',
        skills: opportunity.skills || [],
        expiresAt: opportunity.expiresAt || '',
        description: opportunity.description || '',
      });
      setSelectedSkills(opportunity.skills || []);
    }
  }, [opportunity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if ((name === 'salaryMin' || name === 'salaryMax') && Number(value) < 0) {
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
    
    setTimeout(() => {
      setFormData(prev => {
        if (name === 'salaryMin' && value !== '' && prev.salaryMax !== '' && Number(value) > Number(prev.salaryMax)) {
          return { ...prev, salaryMax: value };
        }
        if (name === 'salaryMax' && value !== '' && prev.salaryMin !== '' && Number(value) < Number(prev.salaryMin)) {
          return { ...prev, salaryMin: value };
        }
        return prev;
      });
    }, 0);
  };

  const handleSkillToggle = (skill) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(opportunity.id, {
      ...formData,
      skills: selectedSkills,
      salaryMin: formData.salaryMin ? Number(formData.salaryMin) : null,
      salaryMax: formData.salaryMax ? Number(formData.salaryMax) : null,
    });
    onClose();
  };

  const filteredSkills = mockAvailableTags.filter(skill =>
    skill.toLowerCase().includes(skillSearch.toLowerCase())
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Редактирование возможности" maxWidth="md">
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Название *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Тип</label>
            <select name="type" value={formData.type} onChange={handleChange} className={styles.select}>
              <option value="Вакансия">Вакансия</option>
              <option value="Стажировка">Стажировка</option>
              <option value="Менторство">Менторство</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Формат работы</label>
            <select name="workFormat" value={formData.workFormat} onChange={handleChange} className={styles.select}>
              <option value="Офис">Офис</option>
              <option value="Гибрид">Гибрид</option>
              <option value="Удалённо">Удалённо</option>
            </select>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Город</label>
          <input
            type="text"
            name="locationCity"
            value={formData.locationCity}
            onChange={handleChange}
            placeholder="Например: Москва"
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Зарплата от (₽)</label>
            <input
              type="number"
              name="salaryMin"
              value={formData.salaryMin}
              onChange={handleChange}
              placeholder="Минимальная"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Зарплата до (₽)</label>
            <input
              type="number"
              name="salaryMax"
              value={formData.salaryMax}
              onChange={handleChange}
              placeholder="Максимальная"
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Навыки</label>
          <input
            type="text"
            placeholder="Поиск навыков..."
            value={skillSearch}
            onChange={(e) => setSkillSearch(e.target.value)}
            className={styles.skillSearchInput}
          />
          <div className={styles.skillsList}>
            {filteredSkills.map(skill => (
              <button
                key={skill}
                type="button"
                className={`${styles.skillChip} ${selectedSkills.includes(skill) ? styles.selected : ''}`}
                onClick={() => handleSkillToggle(skill)}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Действительно до *</label>
          <input
            type="date"
            name="expiresAt"
            value={formData.expiresAt}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Описание</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Обязанности, требования, условия..."
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