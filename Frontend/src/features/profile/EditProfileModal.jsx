import React, { useState } from 'react';
import styles from './EditProfileModal.module.css';


export const EditProfileModal = ({ isOpen, onClose, profile, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: profile?.firstName || '',
    secondName: profile?.secondName || '',
    lastName: profile?.lastName || '',
    university: profile?.university || '',
    faculty: profile?.faculty || '',
    graduationYear: profile?.graduationYear || new Date().getFullYear(),
    skills: profile?.skills?.join(', ') || '',
    github: profile?.github || '',
    resume: profile?.resume || '',
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.lastName.trim()) newErrors.lastName = 'Фамилия обязательна';
    if (!formData.firstName.trim()) newErrors.firstName = 'Имя обязательно';
    if (!formData.university.trim()) newErrors.university = 'Вуз обязателен';
    if (formData.graduationYear < 2000 || formData.graduationYear > 2030) {
      newErrors.graduationYear = 'Год выпуска от 2000 до 2030';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const skillsArray = formData.skills
      .split(',')
      .map(s => s.trim())
      .filter(s => s);

    onSave({
      ...formData,
      skills: skillsArray,
    });
    onClose();
  };

  const handleResumeUpload = async (file) => {
    // Здесь будет логика загрузки резюме
    // Пока просто обновляем состояние
    const text = await file.text();
    setFormData(prev => ({
      ...prev,
      resume: text
    }));
  };

  const handleResumeDelete = () => {
    setFormData(prev => ({
      ...prev,
      resume: ''
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        
        <h2 className={styles.title}>Редактирование профиля</h2>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Фамилия *</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={errors.lastName ? styles.error : ''}
            />
            {errors.lastName && <span className={styles.errorText}>{errors.lastName}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Имя *</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={errors.firstName ? styles.error : ''}
            />
            {errors.firstName && <span className={styles.errorText}>{errors.firstName}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Отчество</label>
            <input
              type="text"
              name="secondName"
              value={formData.secondName}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Вуз *</label>
            <input
              type="text"
              name="university"
              value={formData.university}
              onChange={handleChange}
              className={errors.university ? styles.error : ''}
            />
            {errors.university && <span className={styles.errorText}>{errors.university}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Факультет</label>
            <input
              type="text"
              name="faculty"
              value={formData.faculty}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Год выпуска</label>
            <input
              type="number"
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleChange}
              className={errors.graduationYear ? styles.error : ''}
            />
            {errors.graduationYear && <span className={styles.errorText}>{errors.graduationYear}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Ключевые навыки (через запятую)</label>
            <textarea
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="Python, SQL, Django, Git"
              rows="3"
              className={styles.textarea}
            ></textarea>
          </div>

          <div className={styles.formGroup}>
            <label>GitHub</label>
            <input
              type="url"
              name="github"
              value={formData.github}
              onChange={handleChange}
              placeholder="https://github.com/username"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Резюме</label>
            <textarea
              name="resume"
              value={formData.resume}
              onChange={handleChange}
              placeholder="Введите текст резюме"
              rows="6"
              className={styles.textarea}
            ></textarea>
          </div>

          <div className={styles.buttonGroup}>
            <button type="button" className={styles.cancelButton} onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className={styles.saveButton}>
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};