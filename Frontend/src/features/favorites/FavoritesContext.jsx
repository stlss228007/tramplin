import React, { createContext, useContext, useState, useCallback } from 'react';

const STORAGE_KEY = 'tramplin_favorites';
const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
  const [savedIds, setSavedIds] = useState([]);

  const toggleFavorite = useCallback((id) => {
    setSavedIds(prev => 
      prev.includes(id) ? prev.filter(savedId => savedId !== id) : [...prev, id]
    );
  }, []);

  const isFavorite = useCallback((id) => savedIds.includes(id), [savedIds]);

  const clearFavorites = useCallback(() => setSavedIds([]), []);

  return (
    <FavoritesContext.Provider value={{ savedIds, toggleFavorite, isFavorite, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};