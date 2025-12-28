import { useState, useCallback } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = useCallback((robot) => {
    setFavorites(prev => {
      const exists = prev.find(r => r.id === robot.id);
      if (exists) {
        return prev.filter(r => r.id !== robot.id);
      } else {
        return [...prev, robot];
      }
    });
  }, []);

  const isFavorite = useCallback((robot) => {
    return favorites.find(r => r.id === robot.id);
  }, [favorites]);

  return {
    favorites,
    toggleFavorite,
    isFavorite
  };
};
