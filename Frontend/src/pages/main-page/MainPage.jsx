// src/pages/main-page/MainPage.jsx
import React, { useState, useCallback, useEffect } from 'react';
import { MainMap } from '@/widgets/main-map';
import { OpportunitiesDrawer } from '@/widgets/opportunities-drawer';
import { SearchModal } from '@/features/search-opportunities';
import { NotificationsModal, useNotifications } from '@/features/notifications';
import { ProfileMenu } from '@/features/profile';
import { opportunities } from '@/shared/api/mock';
import styles from './MainPage.module.css';

export const MainPage = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [filteredOpportunities, setFilteredOpportunities] = useState(opportunities);
  const { notifications, unreadCount, markAsRead, markAllAsRead, acceptConnection, rejectConnection } = useNotifications();

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Функция для полного сброса (вызывается из OpportunitiesDrawer)
  const handleClearAll = useCallback(() => {
    setSearchTerm('');
  }, []);

  // Функция для обновления отфильтрованных возможностей
  const handleFilteredOpportunitiesChange = useCallback((filteredOpps) => {
    setFilteredOpportunities(filteredOpps);
  }, []);

  // Синхронизируем filteredOpportunities при изменении searchTerm из MainPage
  // Это нужно для случая, когда пользователь вводит поиск в модалке на главной
  useEffect(() => {
    // Если searchTerm изменился, нужно заставить OpportunitiesDrawer обновиться
    // OpportunitiesDrawer сам вызовет handleFilteredOpportunitiesChange после применения фильтра
    // Мы просто ждём, что он это сделает
    const timer = setTimeout(() => {
      // Небольшая задержка, чтобы дровер успел обработать
      // Это костыль, но работает
    }, 100);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div className="h-screen overflow-hidden bg-[#1a1e2b] relative">
      <MainMap filteredOpportunities={filteredOpportunities} />
      
      <div className="absolute top-0 left-0 right-0 z-20 p-4 pointer-events-none">
        <div className="flex justify-between items-center pointer-events-auto">
          <div className="flex gap-2.5">
            <button 
              onClick={() => {
                const event = new CustomEvent('openFilterModal');
                window.dispatchEvent(event);
              }}
              className="w-11 h-11 bg-[rgba(30,35,55,0.9)] backdrop-blur border border-white/20 rounded-3xl flex items-center justify-center text-white text-xl cursor-pointer shadow-[0_6px_15px_rgba(0,0,0,0.3)] hover:bg-[#3e4a6b] transition-colors"
            >
              <i className="fas fa-sliders-h"></i>
            </button>
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="w-11 h-11 bg-[rgba(30,35,55,0.9)] backdrop-blur border border-white/20 rounded-3xl flex items-center justify-center text-white text-xl cursor-pointer shadow-[0_6px_15px_rgba(0,0,0,0.3)] hover:bg-[#3e4a6b] transition-colors"
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
          <div className="flex gap-2.5">
            <button 
              onClick={() => setIsNotificationsOpen(true)}
              className="w-11 h-11 bg-[rgba(30,35,55,0.9)] backdrop-blur border border-white/20 rounded-3xl flex items-center justify-center text-white text-xl cursor-pointer shadow-[0_6px_15px_rgba(0,0,0,0.3)] hover:bg-[#3e4a6b] transition-colors relative"
            >
              <i className="fas fa-bell"></i>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white font-bold px-1">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </button>
            <ProfileMenu />
          </div>
        </div>
      </div>

      <OpportunitiesDrawer 
        searchTerm={searchTerm} 
        onClearAll={handleClearAll}
        onFilteredOpportunitiesChange={handleFilteredOpportunitiesChange}
      />
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onSearch={handleSearch}
        initialSearchTerm={searchTerm}
      />
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        unreadCount={unreadCount}
        onMarkAsRead={markAsRead}
        onMarkAllAsRead={markAllAsRead}
        onAccept={acceptConnection}
        onReject={rejectConnection}
      />
    </div>
  );
};