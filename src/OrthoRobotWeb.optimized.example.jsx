/**
 * 优化示例文件
 *
 * 这个文件展示了如何使用新的模块化架构重构原始的 OrthoRobotWeb 组件
 * 原始文件: 1642行
 * 优化后预估: ~300-400行 (使用子组件后)
 *
 * 主要改进:
 * 1. 数据分离到 data/ 目录
 * 2. 自定义hooks管理状态逻辑
 * 3. UI组件拆分为小组件
 * 4. 使用 useMemo/useCallback 优化性能
 */

import React, { useState } from 'react';
import Header from './components/Header';
import NewsSection from './components/NewsSection';
import FilterBar from './components/FilterBar';
import { useRobotFilters } from './hooks/useRobotFilters';
import { useFavorites } from './hooks/useFavorites';
import { useCompare } from './hooks/useCompare';
import { robots, cameraOptions, armOptions } from './data/robotsData';
import { news } from './data/contentData';

/**
 * 优化后的主组件
 *
 * 特点:
 * - 使用自定义 hooks 管理状态
 * - 拆分为独立的子组件
 * - 数据来自外部文件
 * - 性能优化 (memoization)
 */
const OrthoRobotWebOptimized = () => {
  // UI 状态
  const [showAllNews, setShowAllNews] = useState(false);
  const [showPolicyDetail, setShowPolicyDetail] = useState(false);
  const [showAnatomyEducation, setShowAnatomyEducation] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  // 使用自定义 hooks 管理复杂状态
  const filters = useRobotFilters(robots);
  const favorites = useFavorites();
  const compare = useCompare(3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header 组件 */}
      <Header />

      {/* News Section 组件 */}
      <NewsSection
        news={news}
        showAllNews={showAllNews}
        setShowAllNews={setShowAllNews}
        setShowPolicyDetail={setShowPolicyDetail}
      />

      {/* Filter Bar 组件 */}
      <FilterBar
        selectedIndication={filters.selectedIndication}
        setSelectedIndication={filters.setSelectedIndication}
        budgetFilter={filters.budgetFilter}
        setBudgetFilter={filters.setBudgetFilter}
        recoveryFilter={filters.recoveryFilter}
        setRecoveryFilter={filters.setRecoveryFilter}
        cameraFilter={filters.cameraFilter}
        setCameraFilter={filters.setCameraFilter}
        armFilter={filters.armFilter}
        setArmFilter={filters.setArmFilter}
        sortBy={filters.sortBy}
        setSortBy={filters.setSortBy}
        compareMode={compare.compareMode}
        toggleCompareMode={compare.toggleCompareMode}
        selectedForCompare={compare.selectedForCompare}
        setShowAnatomyEducation={setShowAnatomyEducation}
        setAnimationStep={setAnimationStep}
        cameraOptions={cameraOptions}
        armOptions={armOptions}
        filteredCount={filters.filteredRobots.length}
      />

      {/*
        其他组件部分...
        由于原始文件太大，这里仅展示主要结构
        完整实现需要继续创建:
        - RobotList 组件
        - RobotCard 组件
        - CompareView 组件
        - AnatomyEducation 组件
        - 等等...
      */}

      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center py-8 text-gray-500">
          <p>机器人列表和其他功能组件...</p>
          <p className="mt-2 text-sm">
            优化架构已就绪，可继续拆分剩余UI组件
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrthoRobotWebOptimized;

/**
 * 使用说明:
 *
 * 1. 将此文件重命名为 OrthoRobotWeb.jsx 或在 App.jsx 中导入使用
 * 2. 继续创建剩余的子组件 (RobotList, RobotCard等)
 * 3. 将原始文件中的UI代码逐步迁移到对应组件
 *
 * 优势:
 * - 代码更清晰易读
 * - 组件可复用
 * - 易于测试
 * - 性能更好
 * - 团队协作更容易
 */
