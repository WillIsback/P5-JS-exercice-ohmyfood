'use client';
import { FavoritesContext } from './Contexts.jsx';
import { useState } from 'react';

export default function FavoritesProvider({ children, initialFavorites = {} }) {
  const [favorites, setFavorites] = useState(initialFavorites);

  function handleAddFavorite(isLiked, id) {
    setFavorites(prev => {
      const updated = { ...prev, [id]: isLiked };
      document.cookie = `favorites=${encodeURIComponent(JSON.stringify(updated))}; path=/`;
      return updated;
    });
  }

  return (
    <FavoritesContext.Provider value={{ 
      favorites, 
      handleAddFavorite,
      // Fonction utilitaire pour vérifier si un restaurant est liké
      isLiked: (id) => !!favorites[id]
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}