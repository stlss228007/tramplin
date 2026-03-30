import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileMenu.module.css';

export const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfileClick = () => {
    if (currentUser) {
      if (currentUser.role === 'applicant') {
        navigate('/profile/applicant');
      } else if (currentUser.role === 'employer') {
        navigate('/profile/employer');
      } else if (currentUser.role === 'curator') {
        navigate('/profile/curator');
      }
    }
    setIsOpen(false);
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
    setIsOpen(false);
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className={styles.container} ref={menuRef}>
      <button className={styles.trigger} onClick={() => setIsOpen(!isOpen)}>
        <i className="fas fa-user-circle"></i>
      </button>
      
      {isOpen && (
        <div className={styles.menu}>
          <button className={styles.menuItem} onClick={handleProfileClick}>
            <i className="fas fa-user"></i>
            <span>Профиль</span>
          </button>
          <button className={styles.menuItem} onClick={handleLogoutClick}>
            <i className="fas fa-sign-out-alt"></i>
            <span>Выйти</span>
          </button>
        </div>
      )}
    </div>
  );
};