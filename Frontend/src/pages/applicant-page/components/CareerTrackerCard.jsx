import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import styles from '../ApplicantPage.module.css';

export const CareerTrackerCard = ({ tracker = { upcomingEvents: [], scheduledInterviews: [] }, onAddEvent, onRemoveEvent, onAddInterview, onRemoveInterview }) => {
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [showAllInterviews, setShowAllInterviews] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showAddInterviewModal, setShowAddInterviewModal] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [newInterviewCompany, setNewInterviewCompany] = useState('');
  const [newInterviewDate, setNewInterviewDate] = useState('');

  const formatDateTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
    }) + ' в ' + date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const visibleEvents = showAllEvents ? tracker.upcomingEvents : tracker.upcomingEvents.slice(0, 3);
  const visibleInterviews = showAllInterviews ? tracker.scheduledInterviews : tracker.scheduledInterviews.slice(0, 3);
  const hasMoreEvents = tracker.upcomingEvents.length > 3;
  const hasMoreInterviews = tracker.scheduledInterviews.length > 3;

  const handleAddEvent = () => {
    if (newEventTitle.trim() && newEventDate) {
      onAddEvent({
        id: Date.now(),
        title: newEventTitle,
        date: new Date(newEventDate).toISOString(),
      });
      setNewEventTitle('');
      setNewEventDate('');
      setShowAddEventModal(false);
    }
  };

  const handleAddInterview = () => {
    if (newInterviewCompany.trim() && newInterviewDate) {
      onAddInterview({
        id: Date.now(),
        company: newInterviewCompany,
        date: new Date(newInterviewDate).toISOString(),
        format: 'online',
      });
      setNewInterviewCompany('');
      setNewInterviewDate('');
      setShowAddInterviewModal(false);
    }
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardTitle}>
          <i className="fas fa-chart-line"></i> Карьерный трекер
        </div>

        <div className={styles.trackerSection}>
          <div className={styles.trackerSubtitle}>
            <i className="fas fa-calendar-alt"></i> Мероприятия ({tracker.upcomingEvents.length})
            <Button 
              variant="outline" 
              size="sm" 
              className={styles.addTrackerButtonSmall}
              onClick={() => setShowAddEventModal(true)}
            >
              <i className="fas fa-plus"></i> Добавить
            </Button>
          </div>
          <div className={styles.trackerList}>
            {visibleEvents.map((event) => (
              <div key={event.id} className={styles.trackerItem}>
                <div className={styles.trackerInfo}>
                  <span className={styles.trackerTitle}>{event.title}</span>
                  <span className={styles.trackerDate}>{formatDateTime(event.date)}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={styles.removeTrackerButton}
                  onClick={() => onRemoveEvent(event.id)}
                  title="Удалить мероприятие"
                >
                  <i className="fas fa-times"></i>
                </Button>
              </div>
            ))}
            {tracker.upcomingEvents.length === 0 && (
              <div className={styles.emptyTracker}>Нет мероприятий</div>
            )}
          </div>
          {hasMoreEvents && (
            <Button 
              variant="outline" 
              className={styles.showAllButton}
              onClick={() => setShowAllEvents(!showAllEvents)}
            >
              {showAllEvents ? (
                <><i className="fas fa-chevron-up"></i> Показать меньше</>
              ) : (
                <><i className="fas fa-chevron-down"></i> Показать все ({tracker.upcomingEvents.length})</>
              )}
            </Button>
          )}
        </div>

        <div className={styles.trackerSection}>
          <div className={styles.trackerSubtitle}>
            <i className="fas fa-briefcase"></i> Собеседования ({tracker.scheduledInterviews.length})
            <Button 
              variant="outline" 
              size="sm" 
              className={styles.addTrackerButtonSmall}
              onClick={() => setShowAddInterviewModal(true)}
            >
              <i className="fas fa-plus"></i> Добавить
            </Button>
          </div>
          <div className={styles.trackerList}>
            {visibleInterviews.map((interview) => (
              <div key={interview.id} className={styles.trackerItem}>
                <div className={styles.trackerInfo}>
                  <span className={styles.trackerTitle}>{interview.company}</span>
                  <span className={styles.trackerDate}>{formatDateTime(interview.date)}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={styles.removeTrackerButton}
                  onClick={() => onRemoveInterview(interview.id)}
                  title="Удалить собеседование"
                >
                  <i className="fas fa-times"></i>
                </Button>
              </div>
            ))}
            {tracker.scheduledInterviews.length === 0 && (
              <div className={styles.emptyTracker}>Нет запланированных собеседований</div>
            )}
          </div>
          {hasMoreInterviews && (
            <Button 
              variant="outline" 
              className={styles.showAllButton}
              onClick={() => setShowAllInterviews(!showAllInterviews)}
            >
              {showAllInterviews ? (
                <><i className="fas fa-chevron-up"></i> Показать меньше</>
              ) : (
                <><i className="fas fa-chevron-down"></i> Показать все ({tracker.scheduledInterviews.length})</>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Модалка добавления мероприятия */}
      {showAddEventModal && (
        <div className={styles.modalOverlay} onClick={() => setShowAddEventModal(false)}>
          <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="icon" className={styles.modalCloseButton} onClick={() => setShowAddEventModal(false)}>
              <i className="fas fa-times"></i>
            </Button>
            <h3 className={styles.modalTitle}>Добавить мероприятие</h3>
            <input
              type="text"
              placeholder="Название мероприятия"
              className={styles.searchInput}
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
            />
            <input
              type="datetime-local"
              className={styles.searchInput}
              value={newEventDate}
              onChange={(e) => setNewEventDate(e.target.value)}
            />
            <Button variant="default" className={styles.addTrackerButton} onClick={handleAddEvent}>
              Добавить
            </Button>
          </div>
        </div>
      )}

      {/* Модалка добавления собеседования */}
      {showAddInterviewModal && (
        <div className={styles.modalOverlay} onClick={() => setShowAddInterviewModal(false)}>
          <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="icon" className={styles.modalCloseButton} onClick={() => setShowAddInterviewModal(false)}>
              <i className="fas fa-times"></i>
            </Button>
            <h3 className={styles.modalTitle}>Добавить собеседование</h3>
            <input
              type="text"
              placeholder="Компания"
              className={styles.searchInput}
              value={newInterviewCompany}
              onChange={(e) => setNewInterviewCompany(e.target.value)}
            />
            <input
              type="datetime-local"
              className={styles.searchInput}
              value={newInterviewDate}
              onChange={(e) => setNewInterviewDate(e.target.value)}
            />
            <Button variant="default" className={styles.addTrackerButton} onClick={handleAddInterview}>
              Добавить
            </Button>
          </div>
        </div>
      )}
    </>
  );
};