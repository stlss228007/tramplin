import React from 'react';
import { formatSalary, formatDate } from '@/shared/lib';
import styles from './opportunity-card.module.css';

export const OpportunityCard = ({ 
  opportunity, 
  isSaved = false, 
  onSaveToggle,
  onClick 
}) => {
  const {
    ID,
    Title,
    OpportunityType,
    WorkFormat,
    Employer,
    Tags = [],
    SalaryMin,
    SalaryMax,
    ExpiresAt,
    CreatedAt,
  } = opportunity;

  const companyName = Employer?.companyName || 'Не указана';
  const skills = Tags.map(tag => tag.name);

  const displaySkills = skills.slice(0, 3);
  const hasMoreSkills = skills.length > 3;

  const handleSaveClick = (e) => {
    e.stopPropagation();
    onSaveToggle?.(ID);
  };

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.header}>
        <h3 className={styles.title}>{Title}</h3>
        <span className={styles.badge}>{OpportunityType}</span>
      </div>
      
      <div className={styles.companyInfo}>
        <i className="far fa-building"></i>
        <span>{companyName}</span>
        <span className="w-1 h-1 bg-[#3f4e6b] rounded-full"></span>
        <span>{WorkFormat}</span>
      </div>
      
      {skills.length > 0 && (
        <div className={styles.skills}>
          {displaySkills.map((skill) => (
            <span key={skill} className={styles.skill}>{skill}</span>
          ))}
          {hasMoreSkills && (
            <span className={styles.skill}>+{skills.length - 3}</span>
          )}
        </div>
      )}
      
      <div className={styles.meta}>
        <span><i className="far fa-calendar"></i> до {formatDate(ExpiresAt)}</span>
        <span><i className="far fa-clock"></i> {formatDate(CreatedAt)}</span>
      </div>
      
      <div className={styles.footer}>
        <span className={styles.salary}>{formatSalary(SalaryMin, SalaryMax)}</span>
        <button 
          className={`${styles.bookmark} ${isSaved ? styles.bookmarkSaved : styles.bookmarkDefault}`}
          onClick={handleSaveClick}
        >
          <i className={isSaved ? "fas fa-bookmark" : "far fa-bookmark"}></i>
        </button>
      </div>
    </div>
  );
};