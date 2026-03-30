import React, { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import styles from './FilterModal.module.css';

export const FilterModal = ({ 
  isOpen, 
  onClose,
  selectedSkills,
  selectedLevels,
  selectedTypes,
  availableSkills,
  availableLevels,
  availableTypes,
  onToggleSkill,
  onToggleLevel,
  onToggleType,
  onReset,
  activeFiltersCount,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSkills = availableSkills.filter(skill =>
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Фильтры" maxWidth="md">
      <div className="space-y-5">
        <input
          type="text"
          placeholder="Поиск навыков..."
          className="w-full px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-[#ffd757] transition-colors"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Навыки / технологии</label>
          <div className="flex flex-wrap gap-2">
            {filteredSkills.map((skill) => (
              <button
                key={skill}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  selectedSkills.includes(skill) 
                    ? 'bg-[#ffd757] text-[#1a1e2b]' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
                onClick={() => onToggleSkill(skill)}
              >
                {skill}
              </button>
            ))}
            {filteredSkills.length === 0 && (
              <div className="text-white/50 text-sm py-2">Ничего не найдено</div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Уровень</label>
          <div className="flex flex-wrap gap-2">
            {availableLevels.map((level) => (
              <button
                key={level}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  selectedLevels.includes(level) 
                    ? 'bg-[#ffd757] text-[#1a1e2b]' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
                onClick={() => onToggleLevel(level)}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Тип возможности</label>
          <div className="flex flex-wrap gap-2">
            {availableTypes.map((type) => (
              <button
                key={type}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  selectedTypes.includes(type) 
                    ? 'bg-[#ffd757] text-[#1a1e2b]' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
                onClick={() => onToggleType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button 
            className="flex-1 py-3 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition-all"
            onClick={onClose}
          >
            Применить {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </button>
          <button 
            className="flex-1 py-3 rounded-full bg-white/5 text-white font-medium hover:bg-white/15 transition-all"
            onClick={onReset}
          >
            Сбросить всё
          </button>
        </div>
      </div>
    </Modal>
  );
};