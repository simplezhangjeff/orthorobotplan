import React from 'react';
import { Filter, Play } from 'lucide-react';
import { indications } from '../data/robotsData';

const FilterBar = ({
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
  compareMode,
  toggleCompareMode,
  selectedForCompare,
  setShowAnatomyEducation,
  setAnimationStep,
  cameraOptions,
  armOptions,
  filteredCount
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 pb-4">
      {/* Indication Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-4">
        {indications.map((ind) => (
          <button
            key={ind.id}
            onClick={() => setSelectedIndication(ind.id)}
            className={`flex items-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              selectedIndication === ind.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="mr-2">{ind.icon}</span>
            {ind.name}
          </button>
        ))}
        <button
          onClick={() => {
            setShowAnatomyEducation(true);
            setAnimationStep(0);
          }}
          className="flex items-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all shadow-md"
        >
          <Play className="w-4 h-4 mr-2" />
          手术科普动画
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <select
          value={budgetFilter}
          onChange={(e) => setBudgetFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">预算不限</option>
          <option value="low">≤6万</option>
          <option value="medium">6-10万</option>
          <option value="high">≥8万</option>
        </select>

        <select
          value={recoveryFilter}
          onChange={(e) => setRecoveryFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">恢复时间不限</option>
          <option value="fast">≤2周</option>
          <option value="normal">≤3周</option>
        </select>

        <select
          value={cameraFilter}
          onChange={(e) => setCameraFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500"
        >
          {cameraOptions.map((camera) => (
            <option key={camera} value={camera}>
              {camera === 'all' ? '相机不限' : camera}
            </option>
          ))}
        </select>

        <select
          value={armFilter}
          onChange={(e) => setArmFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500"
        >
          {armOptions.map((arm) => (
            <option key={arm} value={arm}>
              {arm === 'all' ? '机械臂不限' : arm}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="recommended">智能推荐</option>
          <option value="price">费用优先</option>
          <option value="recovery">快速恢复</option>
          <option value="rating">评分最高</option>
        </select>

        <button
          onClick={toggleCompareMode}
          className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center ${
            compareMode
              ? 'bg-blue-600 text-white'
              : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Filter className="w-4 h-4 mr-1" />
          {compareMode ? `对比中 (${selectedForCompare.length}/3)` : '对比'}
        </button>

        <span className="text-sm text-gray-500 ml-auto">
          共 <span className="font-semibold text-blue-600">{filteredCount}</span> 款产品
        </span>
      </div>
    </div>
  );
};

export default FilterBar;
