import { useState, useMemo } from 'react';
import { filterRobots, sortRobots } from '../utils/helpers';

export const useRobotFilters = (robots) => {
  const [selectedIndication, setSelectedIndication] = useState('all');
  const [budgetFilter, setBudgetFilter] = useState('all');
  const [recoveryFilter, setRecoveryFilter] = useState('all');
  const [cameraFilter, setCameraFilter] = useState('all');
  const [armFilter, setArmFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');

  const filteredAndSortedRobots = useMemo(() => {
    const filtered = filterRobots(robots, {
      selectedIndication,
      budgetFilter,
      recoveryFilter,
      cameraFilter,
      armFilter
    });
    return sortRobots(filtered, sortBy);
  }, [robots, selectedIndication, budgetFilter, recoveryFilter, cameraFilter, armFilter, sortBy]);

  return {
    selectedIndication,
    setSelectedIndication,
    budgetFilter,
    setBudgetFilter,
    recoveryFilter,
    setRecoveryFilter,
    cameraFilter,
    setCameraFilter,
    armFilter,
    setArmFilter,
    sortBy,
    setSortBy,
    filteredRobots: filteredAndSortedRobots
  };
};
