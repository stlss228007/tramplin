import { useEffect } from 'react';

export const useDrawerSwipe = (isOpen, setIsOpen) => {
  useEffect(() => {
    let touchStartY = 0;
    
    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      const windowHeight = window.innerHeight;
      touchStartY = touch.clientY > windowHeight - 100 ? touch.clientY : 0;
    };
    
    const handleTouchEnd = (e) => {
      if (touchStartY === 0) return;
      const diff = touchStartY - e.changedTouches[0].clientY;
      if (diff > 50 && !isOpen) setIsOpen(true);
      touchStartY = 0;
    };
    
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isOpen, setIsOpen]);
};