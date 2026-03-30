import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/modal';
import styles from './SearchModal.module.css';

export const SearchModal = ({ 
  isOpen, 
  onClose,
  onSearch,
  initialSearchTerm = '',
}) => {
  const [searchValue, setSearchValue] = useState(initialSearchTerm);

  useEffect(() => {
    if (isOpen) {
      setSearchValue(initialSearchTerm);
    }
  }, [isOpen, initialSearchTerm]);

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchValue);
    }
    onClose();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    setSearchValue('');
    if (onSearch) {
      onSearch('');
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Поиск" maxWidth="md">
      <div className="space-y-4">
        <input 
          type="text" 
          placeholder="Должность, компания, навык, город..."
          className="w-full px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-[#ffd757] transition-colors"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyPress={handleKeyPress}
          autoFocus
        />
        
        <div className="flex gap-3">
          <button 
            className="flex-1 py-3 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            onClick={handleSearch}
          >
            <i className="fas fa-search"></i>
            Найти
          </button>
          {searchValue && (
            <button 
              className="flex-1 py-3 rounded-full bg-white/5 text-white font-medium hover:bg-white/15 transition-all flex items-center justify-center gap-2"
              onClick={handleClear}
            >
              <i className="fas fa-times"></i>
              Очистить
            </button>
          )}
        </div>
        
        <div className="flex items-center gap-2 pt-2 text-xs text-white/50 border-t border-white/10">
          <i className="fas fa-lightbulb text-[#ffd757]"></i>
          <span>Например: "React", "Яндекс", "Python"</span>
        </div>
      </div>
    </Modal>
  );
};