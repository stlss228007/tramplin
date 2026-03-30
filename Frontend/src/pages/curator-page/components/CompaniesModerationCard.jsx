import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import styles from '../CuratorPage.module.css';

export const CompaniesModerationCard = ({ companies, onApprove, onReject }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(false);

  const filtered = companies.filter(c =>
    c.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.inn.includes(searchTerm)
  );

  const visible = showAll ? filtered : filtered.slice(0, 3);
  const hasMore = filtered.length > 3;

  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>
        <i className="fas fa-check-double"></i> Верификация компаний
      </div>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Поиск по названию или ИНН..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <i className="fas fa-search"></i>
      </div>

      <div className={styles.companiesList}>
        {visible.map((company) => (
          <div key={company.id} className={styles.moderateRow}>
            <div className={styles.companyInfo}>
              <strong>{company.companyName}</strong>
              <span className={styles.companyInn}>ИНН: {company.inn}</span>
              <div className={styles.companyVerificationData}>
                {company.verificationData.innVerified && (
                  <span className={styles.verifiedCheck}>✓ ИНН проверен</span>
                )}
                {company.verificationData.corporateEmailVerified && (
                  <span className={styles.verifiedCheck}>✓ Корп.почта подтверждена</span>
                )}
              </div>
              <small>Заявка от {new Date(company.submittedAt).toLocaleDateString('ru-RU')}</small>
            </div>
            <div className={styles.moderateActions}>
              <Button 
                variant="outline" 
                size="sm" 
                className={styles.approveButton}
                onClick={() => onApprove(company.id)}
              >
                <i className="fas fa-check"></i> Подтвердить
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className={styles.rejectButton}
                onClick={() => onReject(company.id)}
              >
                <i className="fas fa-times"></i> Отклонить
              </Button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className={styles.emptyState}>Нет компаний на верификацию</div>
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