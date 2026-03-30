import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import styles from '../ApplicantPage.module.css';

export const ContactsCard = ({ contacts, contactRequests, onAddContact, onRemoveContact, onAcceptRequest, onRejectRequest, onViewContactProfile }) => {
  const [showAllContacts, setShowAllContacts] = useState(false);
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const visibleContacts = showAllContacts ? contacts : contacts.slice(0, 3);
  const hasMoreContacts = contacts.length > 3;

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      // Здесь в реальной версии будет запрос к API
      const mockResults = [
        { id: 's1', firstName: 'Дмитрий', lastName: 'Кузнецов', skills: ['React', 'TypeScript'] },
        { id: 's2', firstName: 'Ольга', lastName: 'Соколова', skills: ['Python', 'Django'] },
        { id: 's3', firstName: 'Андрей', lastName: 'Морозов', skills: ['Java', 'Spring'] },
      ].filter(user =>
        user.firstName.toLowerCase().includes(query.toLowerCase()) ||
        user.lastName.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(mockResults);
    } else {
      setSearchResults([]);
    }
  };

  const handleAddContact = (user) => {
    onAddContact(user);
    setShowAddContactModal(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <>
      {/* Карточка контактов */}
      <div className={styles.card}>
        <div className={styles.cardTitle}>
          <i className="fas fa-handshake"></i> Проф. контакты
        </div>

        {/* Список контактов */}
        <div className={styles.contactChips}>
          {visibleContacts.map((contact) => (
            <div key={contact.id} className={styles.contactChip}>
              <i className="fas fa-user-circle"></i>{' '}
              <span style={{ cursor: 'pointer', color: 'white', textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'} onClick={() => onViewContactProfile(contact)}>
                {contact.applicant.firstName} {contact.applicant.lastName}
              </span>
              <Button
                variant="default"
                size="sm"
                style={{ background: '#e74c3c', border: 'none', borderRadius: '40px', padding: '0.6rem 1.2rem', color: '#1a1e2b', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', transition: 'background 0.15s', fontFamily: 'inherit', fontSize: '0.9rem', fontWeight: '600', marginLeft: '0.5rem' }}
                onClick={() => onRemoveContact(contact.id)}
                title="Удалить контакт"
              >
                Удалить
              </Button>
            </div>
          ))}
        </div>

        {/* Кнопка "Показать все/меньше" */}
        {hasMoreContacts && (
          <Button
            variant="outline"
            className={styles.showAllButton}
            onClick={() => setShowAllContacts(!showAllContacts)}
          >
            {showAllContacts ? (
              <><i className="fas fa-chevron-up"></i> Показать меньше</>
            ) : (
              <><i className="fas fa-chevron-down"></i> Показать все ({contacts.length})</>
            )}
          </Button>
        )}

        {/* Запросы в контакты */}
        {Array.isArray(contactRequests) && contactRequests.length > 0 && (
          <div className={styles.recommendations}>
            <p><strong>Запросы в контакты:</strong></p>
            <div className={styles.recommendationsList}>
              {contactRequests.map((request) => (
                <div key={request.id} className={styles.recommendationItem}>
                  <div className={styles.connectionRequest}>
                    <small>{request.fromName} хочет добавить вас в проф. контакты</small>
                    <div className={styles.connectionActions}>
                      <Button
                        variant="default"
                        size="sm"
                        style={{ background: '#27ae60', border: 'none', borderRadius: '40px', padding: '0.6rem 1.2rem', color: '#1a1e2b', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', transition: 'background 0.15s', fontFamily: 'inherit', fontSize: '0.9rem', fontWeight: '600', marginRight: '0.5rem' }}
                        onClick={() => onAcceptRequest(request.id)}
                      >
                        Принять
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        style={{ background: '#e74c3c', border: 'none', borderRadius: '40px', padding: '0.6rem 1.2rem', color: '#1a1e2b', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', transition: 'background 0.15s', fontFamily: 'inherit', fontSize: '0.9rem', fontWeight: '600' }}
                        onClick={() => onRejectRequest(request.id)}
                      >
                        Отклонить
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Кнопка "Найти контакты" */}
        <Button
          variant="outline"
          className={styles.outlineButton}
          onClick={() => setShowAddContactModal(true)}
        >
          <i className="fas fa-user-plus"></i> Найти контакты
        </Button>
      </div>

      {/* Модалка поиска контактов */}
      {showAddContactModal && (
        <div className={styles.modalOverlay} onClick={() => setShowAddContactModal(false)}>
          <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="icon"
              className={styles.modalCloseButton}
              onClick={() => setShowAddContactModal(false)}
            >
              <i className="fas fa-times"></i>
            </Button>
            <h3 className={styles.modalTitle}>Найти контакты</h3>
            <input
              type="text"
              placeholder="Поиск по имени и фамилии"
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              autoFocus
            />
            <div className={styles.searchResults}>
              {searchResults.map((user) => (
                <div key={user.id} className={styles.searchResultItem}>
                  <div>
                    <strong>{user.firstName} {user.lastName}</strong>
                    <div className={styles.searchResultSkills}>{user.skills.join(', ')}</div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className={styles.addContactButton}
                    onClick={() => handleAddContact(user)}
                  >
                    Добавить
                  </Button>
                </div>
              ))}
              {searchQuery && searchResults.length === 0 && (
                <div className={styles.noResults}>Ничего не найдено</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};