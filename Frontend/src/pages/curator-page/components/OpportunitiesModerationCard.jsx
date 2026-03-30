import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import styles from '../CuratorPage.module.css';

export const OpportunitiesModerationCard = ({ opportunities, onApprove, onReject, onViewDetails }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(false);

  const filtered = opportunities.filter(opp =>
    opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opp.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visible = showAll ? filtered : filtered.slice(0, 3);
  const hasMore = filtered.length > 3;

  const getTypeText = (type) => {
    switch (type) {
      case 'internship': return 'Стажировка';
      case 'mentorship': return 'Менторство';
      default: return 'Вакансия';
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>
        <i className="fas fa-clipboard-list"></i> Карточки на модерации
      </div>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Поиск по названию или компании..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <i className="fas fa-search"></i>
      </div>

      <div className={styles.opportunitiesList}>
        {visible.map((opp) => (
          <div key={opp.id} className={styles.moderateRow}>
            <div className={styles.opportunityInfo}>
              <div className={styles.opportunityHeader}>
                <strong>{opp.title}</strong>
                <span className={styles.opportunityType}>{getTypeText(opp.type)}</span>
              </div>
              <div className={styles.opportunityCompany}>{opp.companyName}</div>
              {opp.skills && opp.skills.length > 0 && (
                <div className={styles.opportunitySkills}>
                  {opp.skills.slice(0, 3).map(skill => (
                    <span key={skill} className={styles.skillChip}>{skill}</span>
                  ))}
                  {opp.skills.length > 3 && (
                    <span className={styles.skillChip}>+{opp.skills.length - 3}</span>
                  )}
                </div>
              )}
              <small>Создано {new Date(opp.submittedAt).toLocaleDateString('ru-RU')}</small>
            </div>
            <div className={styles.moderateActions}>
              <Button 
                variant="outline" 
                size="sm" 
                className={styles.viewButton}
                onClick={() => onViewDetails(opp)}
              >
                <i className="fas fa-eye"></i>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className={styles.approveButton}
                onClick={() => onApprove(opp.id)}
              >
                <i className="fas fa-check"></i>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className={styles.rejectButton}
                onClick={() => onReject(opp.id)}
              >
                <i className="fas fa-times"></i>
              </Button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className={styles.emptyState}>Нет карточек на модерацию</div>
        )}
      </div>

      {hasMore && (
        <button className={styles.showAllButton} onClick={() => setShowAll(!showAll)}>
          {showAll ? (
            <><i className="fas fa-chevron-up"></i> Показать меньше</>
          ) : (
            <><i className="fas fa-chevron-down"></i> Показать все ({filtered.length})</>
          )}
        </button>
      )}
    </div>
  );
};