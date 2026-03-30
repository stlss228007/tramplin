import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import styles from '../ApplicantPage.module.css';
import { formatDate } from '@/shared/lib';

export const ResponsesCard = ({ 
  applications, 
  favorites, 
  onRemoveApplication, 
  onRemoveFavorite
}) => {
  const [showAllResponses, setShowAllResponses] = useState(false);
  const [showAllFavorites, setShowAllFavorites] = useState(false);

  const getStatusText = (status) => {
    switch (status) {
      case 'accepted': return 'Принят';
      case 'rejected': return 'Отклонён';
      default: return 'На рассмотрении';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'accepted':
        return styles.approved;
      case 'rejected':
        return styles.rejected;
      default:
        return styles.pending;
    }
  };

  const visibleResponses = showAllResponses ? applications : applications.slice(0, 3);
  const visibleFavorites = showAllFavorites ? favorites : favorites.slice(0, 3);
  const hasMoreResponses = applications.length > 3;
  const hasMoreFavorites = favorites.length > 3;

  return (
    <div className={`${styles.card} ${styles.responsesCard}`}>
      <div className={styles.cardTitle}>
        <i className="fas fa-history"></i> Мои отклики ({applications.length})
      </div>
      <div className={styles.responsesList}>
        {visibleResponses.map((app) => (
          <div key={app.id} className={styles.listItem}>
            <div>
              <strong>{app.opportunityTitle}</strong>
            </div>
            <div className={styles.listItemActions}>
              <span className={`${styles.statusBadge} ${getStatusClass(app.status)}`}>
                {getStatusText(app.status)}
              </span>
              <Button 
                variant="ghost" 
                size="icon" 
                className={styles.removeButton}
                onClick={() => onRemoveApplication(app.id)}
                title="Удалить отклик"
              >
                <i className="fas fa-times"></i>
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      {hasMoreResponses && (
        <Button 
          variant="outline" 
          className={styles.showAllButton}
          onClick={() => setShowAllResponses(!showAllResponses)}
        >
          {showAllResponses ? (
            <><i className="fas fa-chevron-up"></i> Показать меньше</>
          ) : (
            <><i className="fas fa-chevron-down"></i> Показать все ({applications.length})</>
          )}
        </Button>
      )}

      <div className={styles.favoritesSection}>
        <div className={styles.cardTitle}>
          <i className="fas fa-bookmark"></i> Избранное ({favorites.length})
        </div>
        <div className={styles.favoritesList}>
          {favorites.length === 0 ? (
            <div className={styles.emptyFavorites}>
              <i className="far fa-bookmark"></i>
              <p>Нет сохранённых вакансий</p>
              <small>Добавляйте вакансии в избранное на главной странице</small>
            </div>
          ) : (
            visibleFavorites.map((fav) => (
              <div key={fav.id} className={styles.favoriteItem}>
                <div className={styles.favoriteInfo}>
                  <strong>{fav.opportunityTitle}</strong>
                  <span className={styles.favoriteCompany}>{fav.companyName}</span>
                  <small>Сохранено {formatDate(fav.savedAt)}</small>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={styles.removeFavoriteButton}
                  onClick={() => onRemoveFavorite(fav.id, fav.opportunityId)}
                  title="Удалить из избранного"
                >
                  <i className="fas fa-times"></i>
                </Button>
              </div>
            ))
          )}
        </div>
        
        {hasMoreFavorites && (
          <Button 
            variant="outline" 
            className={styles.showAllButton}
            onClick={() => setShowAllFavorites(!showAllFavorites)}
          >
            {showAllFavorites ? (
              <><i className="fas fa-chevron-up"></i> Показать меньше</>
            ) : (
              <><i className="fas fa-chevron-down"></i> Показать все ({favorites.length})</>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};