import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@/components/ui/modal';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { formatNotificationTime } from '@/shared/lib/format';
import { EmptyState } from '@/components/ui/empty-state';
import styles from './NotificationsModal.module.css';

export const NotificationsModal = ({ 
  isOpen, 
  onClose, 
  notifications, 
  unreadCount, 
  onMarkAsRead, 
  onMarkAllAsRead,
  onAccept,
  onReject
}) => {
  const navigate = useNavigate();

  const handleViewAllClick = () => {
    onClose();
    navigate('/notifications');
  };

  const visibleNotifications = notifications.slice(0, 5);

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="sm" showCloseButton={true}>
      <VisuallyHidden>
        <h2>Уведомления</h2>
      </VisuallyHidden>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center pb-3 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">Уведомления</h2>
          {unreadCount > 0 && (
            <button 
              className="px-3 py-1.5 rounded-full text-xs bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all flex items-center gap-1.5"
              onClick={onMarkAllAsRead}
            >
              <i className="fas fa-check-double text-xs"></i>
              Прочитать все
            </button>
          )}
        </div>
        
        <div className="space-y-1">
          {notifications.length === 0 ? (
            <div className="py-12 text-center">
              <i className="fas fa-bell-slash text-4xl text-white/30 mb-3 block"></i>
              <p className="text-white/50">Нет уведомлений</p>
            </div>
          ) : (
            visibleNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                  !notification.isRead ? 'bg-white/5' : 'hover:bg-white/5'
                }`}
                onClick={() => onMarkAsRead(notification.id)}
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <i className={`fas ${notification.icon} text-white`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-white">{notification.title}</div>
                  <div className="text-xs text-white/60 mt-0.5 line-clamp-2">
                    {notification.type === 'connection_request' ? (
                      <div className="flex gap-2 mt-1">
                        <button 
                        className="flex-1 px-2 py-1.5 bg-green-600 hover:bg-green-700 rounded text-white text-xs font-medium transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          onMarkAsRead(notification.id);
                          if (onAccept) onAccept(notification.id);
                        }}
                      >
                          Принять
                        </button>
                        <button 
                          className="flex-1 px-2 py-1.5 bg-red-600 hover:bg-red-700 rounded text-white text-xs font-medium transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            onMarkAsRead(notification.id);
                            if (onReject) onReject(notification.id);
                          }}
                        >
                          Отклонить
                        </button>
                      </div>
                    ) : (
                      notification.message
                    )}
                  </div>
                  <div className="text-xs text-white/40 mt-1">{formatNotificationTime(notification.time)}</div>
                </div>
                {!notification.isRead && (
                  <div className="w-2 h-2 bg-[#ffd757] rounded-full mt-2 flex-shrink-0"></div>
                )}
              </div>
            ))
          )}
        </div>
        
        {notifications.length > 0 && (
          <div className="pt-3 border-t border-white/10">
            <button 
              className="w-full py-2.5 rounded-full bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-all flex items-center justify-center gap-2"
              onClick={handleViewAllClick}
            >
              <i className="fas fa-arrow-right text-xs"></i>
              Все уведомления
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};