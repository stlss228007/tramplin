import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '@/features/notifications';
import { formatNotificationTime } from '@/shared/lib/format';
import { EmptyState } from '@/components/ui/empty-state';
import styles from './NotificationsPage.module.css';

export const NotificationsPage = () => {
  const navigate = useNavigate();
  const { notifications, unreadCount, markAsRead, markAllAsRead, acceptConnection, rejectConnection } = useNotifications();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <h1 className={styles.title}>Уведомления</h1>
        {unreadCount > 0 && (
          <button className={styles.markAllButton} onClick={markAllAsRead}>
            <i className="fas fa-check-double"></i>
            Прочитать все
          </button>
        )}
      </div>

      <div className={styles.list}>
        {notifications.length === 0 ? (
          <EmptyState
            icon="fa-bell-slash"
            title="Нет уведомлений"
          />
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`${styles.item} ${!notification.isRead ? styles.unread : ''}`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className={styles.icon}>
                <i className={`fas ${notification.icon}`}></i>
              </div>
              <div className={styles.content}>
                <div className={styles.itemTitle}>{notification.title}</div>
                <div className={styles.message}>
                  {notification.type === 'connection_request' ? (
                    <div className={styles.connectionActions}>
                      <button 
                        className={styles.acceptButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsRead(notification.id);
                          acceptConnection(notification.id);
                        }}
                      >Принять</button>
                      <button 
                        className={styles.rejectButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsRead(notification.id);
                          rejectConnection(notification.id);
                        }}
                      >Отклонить</button>
                    </div>
                  ) : (
                    notification.message
                  )}
                </div>
                <div className={styles.time}>{formatNotificationTime(notification.time)}</div>
              </div>
              {!notification.isRead && <div className={styles.unreadDot}></div>}
            </div>
          ))
        )}
      </div>
    </div>
  );
};