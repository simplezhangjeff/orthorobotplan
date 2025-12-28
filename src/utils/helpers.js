// Robot filtering and sorting utilities
export const filterRobots = (robots, filters) => {
  const { selectedIndication, budgetFilter, recoveryFilter, cameraFilter, armFilter } = filters;

  return robots.filter(robot => {
    if (selectedIndication !== 'all' && !robot.indications.includes(selectedIndication)) {
      return false;
    }

    if (budgetFilter !== 'all') {
      const cost = parseInt(robot.estimatedCost.split('-')[0]);
      if (budgetFilter === 'low' && cost > 6) return false;
      if (budgetFilter === 'medium' && (cost < 6 || cost > 10)) return false;
      if (budgetFilter === 'high' && cost < 8) return false;
    }

    if (recoveryFilter !== 'all') {
      const weeks = parseInt(robot.recoveryTime.split('-')[0]);
      if (recoveryFilter === 'fast' && weeks > 2) return false;
      if (recoveryFilter === 'normal' && weeks > 3) return false;
    }

    if (cameraFilter !== 'all' && robot.cameraBrand !== cameraFilter) return false;
    if (armFilter !== 'all' && robot.armBrand !== armFilter) return false;

    return true;
  });
};

export const sortRobots = (robots, sortBy) => {
  const sorted = [...robots];

  if (sortBy === 'price') {
    return sorted.sort((a, b) =>
      parseInt(a.estimatedCost.split('-')[0]) - parseInt(b.estimatedCost.split('-')[0])
    );
  }

  if (sortBy === 'recovery') {
    return sorted.sort((a, b) =>
      parseInt(a.recoveryTime.split('-')[0]) - parseInt(b.recoveryTime.split('-')[0])
    );
  }

  if (sortBy === 'rating') {
    return sorted.sort((a, b) => b.patientRating - a.patientRating);
  }

  return sorted;
};

// Get robot tags
export const getRobotTags = (robot) => {
  const tags = [];
  const cost = parseInt(robot.estimatedCost.split('-')[0]);
  const weeks = parseInt(robot.recoveryTime.split('-')[0]);

  if (cost <= 6) {
    tags.push({ label: '性价比', color: 'bg-green-100 text-green-700' });
  }
  if (weeks <= 2) {
    tags.push({ label: '快速恢复', color: 'bg-blue-100 text-blue-700' });
  }
  if (robot.patientRating >= 4.7) {
    tags.push({ label: '好评', color: 'bg-purple-100 text-purple-700' });
  }
  if (parseInt(robot.installations) > 500) {
    tags.push({ label: '成熟稳定', color: 'bg-orange-100 text-orange-700' });
  }

  return tags;
};

// Get indication labels
export const getIndicationLabels = (indicationIds) => {
  const labels = { uka: '单髁', tka: '全膝', tha: '全髋' };
  return indicationIds.map(id => labels[id]).join(' · ');
};

// Calculate cost with adjustments
export const calculateCost = (robot, selectedCity, hasInsurance, cities) => {
  const baseCost = parseInt(robot.estimatedCost.split('-')[0]);
  const maxCost = parseInt(robot.estimatedCost.split('-')[1]);
  let adjustedMin = baseCost;
  let adjustedMax = maxCost;

  // City adjustment
  const city = cities.find(c => c.id === selectedCity);
  if (city?.tier === 2) {
    adjustedMin *= 0.85;
    adjustedMax *= 0.85;
  }

  // Insurance adjustment
  const insuranceCoverage = hasInsurance ? 0.4 : 0;
  const outOfPocketMin = adjustedMin * (1 - insuranceCoverage);
  const outOfPocketMax = adjustedMax * (1 - insuranceCoverage);
  const insuranceMin = adjustedMin * insuranceCoverage;
  const insuranceMax = adjustedMax * insuranceCoverage;

  return {
    total: (adjustedMin + adjustedMax) / 2,
    outOfPocket: (outOfPocketMin + outOfPocketMax) / 2,
    insurance: (insuranceMin + insuranceMax) / 2
  };
};
