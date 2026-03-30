import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import styles from '../EmployerPage.module.css';

export const OpportunitiesCard = ({ opportunities, onEdit, onDelete, onShowDetails }) => {
  const [showAll, setShowAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = opportunities.filter(opp =>
    opp.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visible = showAll ? filtered : filtered.slice(0, 3);
  const hasMore = filtered.length > 3;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active': return styles.activeBadge;
      case 'planned': return styles.plannedBadge;
      case 'closed': return styles.closedBadge;
      default: return '';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'активная';
      case 'planned': return 'запланирована';
      case 'closed': return 'завершена';
      default: return '';
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>
        <i className="fas fa-list-ul"></i> Мои возможности
      </div>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Поиск по названию..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <i className="fas fa-search"></i>
      </div>

      <div className={styles.opportunitiesList}>
        {visible.map((opp) => (
          <div key={opp.id} className={styles.listItem} style={{ cursor: 'default' }} >
            <div className={styles.opportunityInfo}>
              <span className={styles.opportunityTitle}>{opp.title}</span>
              <span className={`${styles.opportunityStatus} ${getStatusBadge(opp.status)}`}>
                {getStatusText(opp.status)}
              </span>
              {opp.responsesCount > 0 && (
                <span className={styles.responseCount}>{opp.responsesCount} отклик{opp.responsesCount === 1 ? '' : opp.responsesCount < 5 ? 'а' : 'ов'}</span>
              )}
            </div>
            <div className={styles.opportunityActions}>
              <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); onEdit(opp); }} title="Редактировать">
                <i className="fas fa-edit"></i>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className={styles.removeButton}
                onClick={(e) => { e.stopPropagation(); onDelete(opp.id); }} 
                title="Удалить"
              >
                <i className="fas fa-times"></i>
              </Button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className={styles.emptyState}>Нет возможностей</div>
        )}
      </div>

      {hasMore && (
        <Button variant="outline" className={styles.showAllButton} onClick={() => setShowAll(!showAll)}>
          {showAll ? (
            <><i className="fas fa-chevron-up"></i> Показать меньше</>
          ) : (
            <><i className="fas fa-chevron-down"></i> Показать все ({filtered.length})</>
          )}
        </Button>
      )}
    </div>
  );
};