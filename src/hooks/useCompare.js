import { useState, useCallback } from 'react';

export const useCompare = (maxCompare = 3) => {
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState([]);

  const toggleCompare = useCallback((robot) => {
    setSelectedForCompare(prev => {
      const exists = prev.find(r => r.id === robot.id);
      if (exists) {
        return prev.filter(r => r.id !== robot.id);
      } else if (prev.length < maxCompare) {
        return [...prev, robot];
      }
      return prev;
    });
  }, [maxCompare]);

  const toggleCompareMode = useCallback(() => {
    setCompareMode(prev => {
      if (prev) {
        setSelectedForCompare([]);
      }
      return !prev;
    });
  }, []);

  const isSelected = useCallback((robot) => {
    return selectedForCompare.find(r => r.id === robot.id);
  }, [selectedForCompare]);

  return {
    compareMode,
    setCompareMode,
    toggleCompareMode,
    selectedForCompare,
    toggleCompare,
    isSelected
  };
};
