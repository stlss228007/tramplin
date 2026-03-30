import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import styles from '../EmployerPage.module.css';

export const ResponsesCard = ({ responses, onStatusChange, onRemove, onViewContactProfile }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(false);

  const getStatusText = (status) => {
    switch (status) {
      case 'accepted': return 'Принят';
      case 'rejected': return 'Отклонён';
      default: return 'На рассмотрении';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'accepted': return styles.approved;
      case 'rejected': return styles.rejected;
      default: return styles.pending;
    }
  };

  const filtered = responses.filter(r =>
    r.applicantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visible = showAll ? filtered : filtered.slice(0, 3);
  const hasMore = filtered.length > 3;

  const isFinalStatus = (status) => status === 'accepted' || status === 'rejected';

  const handleRemoveClick = (responseId) => {
    if (confirm('Удалить этот отклик из списка?')) {
      onRemove(responseId);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>
        <i className="fas fa-users"></i> Откликнувшиеся
      </div>
      
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Поиск по имени..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <i className="fas fa-search"></i>
      </div>

      <div className={styles.responsesList}>
        {visible.map((response) => (
          <div key={response.id} className={styles.listItem}>
            <div className={styles.responseInfo}>
              <span 
                style={{ cursor: 'pointer', color: '#ffffff', textDecoration: 'none' }} 
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} 
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'} 
                onClick={() => {
                  if (onViewContactProfile && typeof onViewContactProfile === 'function') {
                    onViewContactProfile(response);
                  }
                }}
              >
                {response.applicantName}
              </span>
            </div>
            <div className={styles.responseActions}>
              {isFinalStatus(response.status) ? (
                <>
                  <span className={`${styles.statusBadge} ${getStatusClass(response.status)}`}>
                    {getStatusText(response.status)}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={styles.removeButton}
                    onClick={() => handleRemoveClick(response.id)}
                    title="Удалить из списка"
                  >
                    <i className="fas fa-times"></i>
                  </Button>
                </>
              ) : (
                <select
                  className={styles.statusSelect}
                  value={response.status}
                  onChange={(e) => onStatusChange(response.id, e.target.value)}
                >
                  <option value="pending">На рассмотрении</option>
                  <option value="accepted">Принять</option>
                  <option value="rejected">Отклонить</option>
                </select>
              )}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className={styles.emptyState}>
            {searchTerm ? 'Нет откликов с таким именем' : 'Нет откликов'}
          </div>
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