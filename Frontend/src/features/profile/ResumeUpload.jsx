import React, { useRef, useState } from 'react';
import styles from './ResumeUpload.module.css';

export const ResumeUpload = ({ currentResume, onUpload, onDelete }) => {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      // showToast('Можно загружать только PDF файлы', 'error');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // showToast('Максимальный размер файла — 5 МБ', 'error');
      return;
    }

    setIsUploading(true);
    try {
      await onUpload(file);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = () => {
    if (confirm('Удалить резюме?')) {
      onDelete();
    }
  };

  return (
    <div className={styles.resumeUpload}>
      <div className={styles.resumeInfo}>
        <i className="fas fa-file-pdf"></i>
        <div className={styles.fileNameInfo}>
          <span className={styles.fileName}>{currentResume?.name || 'Резюме не загружено'}</span>
          {currentResume?.updatedAt && (
            <span className={styles.fileDate}>
              обновлено {new Date(currentResume.updatedAt).toLocaleDateString('ru-RU')}
            </span>
          )}
        </div>
      </div>
      <div className={styles.buttons}>
        <input
          type="file"
          ref={fileInputRef}
          accept=".pdf"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <button
          className={styles.uploadButton}
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          {isUploading ? (
            <i className="fas fa-spinner fa-spin"></i>
          ) : (
            <i className="fas fa-upload"></i>
          )}
          {currentResume ? 'Обновить' : 'Загрузить'}
        </button>
        {currentResume && (
          <button className={styles.deleteButton} onClick={handleDelete}>
            <i className="fas fa-trash-alt"></i> Удалить
          </button>
        )}
      </div>
    </div>
  );
};