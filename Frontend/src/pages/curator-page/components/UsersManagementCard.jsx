import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import styles from '../CuratorPage.module.css';

export const UsersManagementCard = ({ applicants, employers, curators, isSuperAdmin, onEditUser, onCreateCurator }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAllApplicants, setShowAllApplicants] = useState(false);
  const [showAllEmployers, setShowAllEmployers] = useState(false);
  const [showAllCurators, setShowAllCurators] = useState(false);

  const filteredApplicants = applicants.filter(a =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredEmployers = employers.filter(e =>
    e.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredCurators = curators.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleApplicants = showAllApplicants ? filteredApplicants : filteredApplicants.slice(0, 2);
  const visibleEmployers = showAllEmployers ? filteredEmployers : filteredEmployers.slice(0, 2);
  const visibleCurators = showAllCurators ? filteredCurators : filteredCurators.slice(0, 2);

  const hasMoreApplicants = filteredApplicants.length > 2;
  const hasMoreEmployers = filteredEmployers.length > 2;
  const hasMoreCurators = filteredCurators.length > 2;

  const getRoleIcon = (role) => {
    switch (role) {
      case 'applicant': return 'fa-user-graduate';
      case 'employer': return 'fa-building';
      case 'curator': return 'fa-user-tie';
      default: return 'fa-user';
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>
        <i className="fas fa-user-cog"></i> Пользователи / Кураторы
      </div>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Поиск пользователей..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <i className="fas fa-search"></i>
      </div>

      {isSuperAdmin && (
        <div className={styles.createCuratorSection}>
          <button className={styles.createCuratorButton} onClick={onCreateCurator}>
            <i className="fas fa-plus"></i> Создать куратора
          </button>
        </div>
      )}

      <div className={styles.usersSection}>
        <div className={styles.sectionHeader}>
          <i className="fas fa-user-graduate"></i> Соискатели ({filteredApplicants.length})
        </div>
        <div className={styles.usersList}>
          {visibleApplicants.map(user => (
            <div key={user.id} className={styles.userItem}>
              <div className={styles.userInfo}>
                <i className={`fas ${getRoleIcon(user.role)}`}></i>
                <span>{user.name}</span>
                <span className={styles.userStatus}>{user.status === 'active' ? 'активен' : 'заморожен'}</span>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className={styles.editUserButton}
                onClick={() => onEditUser(user, 'applicant')}
                title="Редактировать"
              >
                <i className="fas fa-edit"></i>
              </Button>
            </div>
          ))}
          {filteredApplicants.length === 0 && (
            <div className={styles.emptyUsers}>Нет соискателей</div>
          )}
        </div>
        {hasMoreApplicants && (
          <button className={styles.showMoreButton} onClick={() => setShowAllApplicants(!showAllApplicants)}>
            {showAllApplicants ? (
              <><i className="fas fa-chevron-up"></i> Показать меньше</>
            ) : (
              <><i className="fas fa-chevron-down"></i> Показать все ({filteredApplicants.length})</>
            )}
          </button>
        )}
      </div>

      <div className={styles.usersSection}>
        <div className={styles.sectionHeader}>
          <i className="fas fa-building"></i> Работодатели ({filteredEmployers.length})
        </div>
        <div className={styles.usersList}>
          {visibleEmployers.map(user => (
            <div key={user.id} className={styles.userItem}>
              <div className={styles.userInfo}>
                <i className={`fas ${getRoleIcon(user.role)}`}></i>
                <span>{user.name}</span>
                <span className={`${styles.userStatus} ${user.status === 'verified' ? styles.verified : styles.pending}`}>
                  {user.status === 'verified' ? 'верифицирован' : 'на верификации'}
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className={styles.editUserButton}
                onClick={() => onEditUser(user, 'employer')}
                title="Редактировать"
              >
                <i className="fas fa-edit"></i>
              </Button>
            </div>
          ))}
          {filteredEmployers.length === 0 && (
            <div className={styles.emptyUsers}>Нет работодателей</div>
          )}
        </div>
        {hasMoreEmployers && (
          <button className={styles.showMoreButton} onClick={() => setShowAllEmployers(!showAllEmployers)}>
            {showAllEmployers ? (
              <><i className="fas fa-chevron-up"></i> Показать меньше</>
            ) : (
              <><i className="fas fa-chevron-down"></i> Показать все ({filteredEmployers.length})</>
            )}
          </button>
        )}
      </div>

      <div className={styles.usersSection}>
        <div className={styles.sectionHeader}>
          <i className="fas fa-user-tie"></i> Кураторы ({filteredCurators.length})
        </div>
        <div className={styles.usersList}>
          {visibleCurators.map(user => (
            <div key={user.id} className={styles.userItem}>
              <div className={styles.userInfo}>
                <i className={`fas ${getRoleIcon(user.role)}`}></i>
                <span>{user.name}</span>
              </div>
            </div>
          ))}
          {filteredCurators.length === 0 && (
            <div className={styles.emptyUsers}>Нет кураторов</div>
          )}
        </div>
        {hasMoreCurators && (
          <button className={styles.showMoreButton} onClick={() => setShowAllCurators(!showAllCurators)}>
            {showAllCurators ? (
              <><i className="fas fa-chevron-up"></i> Показать меньше</>
            ) : (
              <><i className="fas fa-chevron-down"></i> Показать все ({filteredCurators.length})</>
            )}
          </button>
        )}
      </div>
    </div>
  );
};