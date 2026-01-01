import React, { useState } from 'react';
import { Search, TrendingUp, Award, Calculator, Hospital, MessageCircle, ChevronRight, Star, MapPin } from 'lucide-react';
import { robots, indications } from '../data/robotsData';

/**
 * 汽车之家风格的骨科机器人首页
 * 专注于：国产 vs MAKO 对比，髋膝关节适应症
 */
const AutohomeStyleHome = () => {
  const [priceRange, setPriceRange] = useState('all');
  const [origin, setOrigin] = useState('all'); // 'all', 'domestic', 'imported'
  const [indication, setIndication] = useState('all');
  const [compareList, setCompareList] = useState([]);

  // 价格区间配置（类似汽车之家）
  const priceRanges = [
    { id: 'all', label: '全部', min: 0, max: Infinity },
    { id: '4-6', label: '4-6万', min: 4, max: 6 },
    { id: '5-8', label: '5-8万', min: 5, max: 8 },
    { id: '8-12', label: '8-12万', min: 8, max: 12 },
  ];

  // 筛选机器人
  const filteredRobots = robots.filter(robot => {
    // 价格筛选
    if (priceRange !== 'all') {
      const range = priceRanges.find(r => r.id === priceRange);
      const robotMinPrice = parseInt(robot.estimatedCost.split('-')[0]);
      const robotMaxPrice = parseInt(robot.estimatedCost.split('-')[1]);
      if (robotMinPrice > range.max || robotMaxPrice < range.min) return false;
    }

    // 国产/进口筛选
    if (origin === 'domestic' && robot.origin !== '国产') return false;
    if (origin === 'imported' && robot.origin !== '进口') return false;

    // 适应症筛选（髋膝专用）
    if (indication !== 'all' && !robot.indications.includes(indication)) return false;

    return true;
  });

  // 热门机器人（右侧榜单，类似汽车之家）
  const hotRobots = [
    { robot: robots.find(r => r.name === 'MAKO'), rank: 1, label: '装机量第一' },
    { robot: robots.find(r => r.name === 'Yuanhua'), rank: 2, label: '国产领先' },
    { robot: robots.find(r => r.name === 'ROSA Knee'), rank: 3, label: '无需CT' },
  ];

  // 添加到对比
  const toggleCompare = (robot) => {
    if (compareList.find(r => r.id === robot.id)) {
      setCompareList(compareList.filter(r => r.id !== robot.id));
    } else {
      if (compareList.length < 3) {
        setCompareList([...compareList, robot]);
      } else {
        alert('最多对比3款机器人');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏（汽车之家风格） */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-blue-600">骨科机器人之家</h1>
              <nav className="flex space-x-6 text-sm">
                <a href="#" className="text-blue-600 font-medium">首页</a>
                <a href="#compare" className="text-gray-600 hover:text-blue-600">选机器人</a>
                <a href="#hospitals" className="text-gray-600 hover:text-blue-600">找医院</a>
                <a href="#calculator" className="text-gray-600 hover:text-blue-600">费用计算</a>
                <a href="#reviews" className="text-gray-600 hover:text-blue-600">患者评价</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索机器人/医院..."
                  className="pl-10 pr-4 py-2 border rounded-lg text-sm w-64"
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                登录
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* 筛选工具栏（汽车之家式） */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
          <div className="flex items-center space-x-8">
            {/* 国产/进口切换 */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">类型:</span>
              <div className="flex space-x-2">
                {[
                  { id: 'all', label: '全部' },
                  { id: 'imported', label: '进口' },
                  { id: 'domestic', label: '国产' },
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setOrigin(item.id)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      origin === item.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 价格区间 */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">价格:</span>
              <div className="flex space-x-2">
                {priceRanges.map(range => (
                  <button
                    key={range.id}
                    onClick={() => setPriceRange(range.id)}
                    className={`px-3 py-1 rounded text-sm ${
                      priceRange === range.id
                        ? 'bg-blue-100 text-blue-600 font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 适应症（髋膝专用） */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">适应症:</span>
              <div className="flex space-x-2">
                {[
                  { id: 'all', name: '全部' },
                  { id: 'uka', name: '单髁' },
                  { id: 'tka', name: '全膝' },
                  { id: 'tha', name: '全髋' },
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setIndication(item.id)}
                    className={`px-3 py-1 rounded text-sm ${
                      indication === item.id
                        ? 'bg-blue-100 text-blue-600 font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* 左侧：机器人列表（主要区域） */}
          <div className="flex-1">
            {/* 对比栏（固定在列表上方，类似汽车之家） */}
            {compareList.length > 0 && (
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 mb-4 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="font-medium">已选 {compareList.length}/3 款对比:</span>
                    <div className="flex space-x-2">
                      {compareList.map(robot => (
                        <span key={robot.id} className="px-3 py-1 bg-white/20 rounded text-sm">
                          {robot.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => alert('跳转到对比页面')}
                    className="px-6 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50"
                  >
                    开始对比
                  </button>
                </div>
              </div>
            )}

            {/* 结果数量 */}
            <div className="mb-4 text-sm text-gray-600">
              共找到 <span className="text-blue-600 font-medium">{filteredRobots.length}</span> 款机器人
            </div>

            {/* 机器人卡片列表 */}
            <div className="space-y-4">
              {filteredRobots.map(robot => {
                const isInCompare = compareList.find(r => r.id === robot.id);
                const isMAKO = robot.name === 'MAKO';

                return (
                  <div
                    key={robot.id}
                    className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border ${
                      isMAKO ? 'border-orange-200 bg-orange-50/30' : 'border-gray-100'
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex gap-6">
                        {/* 左侧：机器人图片/logo区域 */}
                        <div className={`w-48 h-32 rounded-lg flex items-center justify-center ${robot.color} bg-opacity-10`}>
                          <div className="text-center">
                            <div className={`text-3xl font-bold ${robot.color.replace('bg-', 'text-')}`}>
                              {robot.name}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">{robot.manufacturer}</div>
                          </div>
                        </div>

                        {/* 中间：核心参数 */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                {robot.name}
                                {isMAKO && (
                                  <span className="px-2 py-0.5 bg-orange-500 text-white text-xs rounded">
                                    全球领先
                                  </span>
                                )}
                                {robot.origin === '国产' && (
                                  <span className="px-2 py-0.5 bg-green-500 text-white text-xs rounded">
                                    国产
                                  </span>
                                )}
                              </h3>
                              <p className="text-sm text-gray-500 mt-1">{robot.manufacturer} | {robot.technology}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-orange-600">
                                {robot.estimatedCost}万
                              </div>
                              <div className="text-xs text-gray-500">手术费用</div>
                            </div>
                          </div>

                          {/* 关键指标（类似汽车之家的参数展示） */}
                          <div className="grid grid-cols-4 gap-4 mb-4">
                            <div className="text-center p-2 bg-gray-50 rounded">
                              <div className="text-sm text-gray-500">装机量</div>
                              <div className="text-lg font-bold text-gray-900">{robot.installations}</div>
                            </div>
                            <div className="text-center p-2 bg-gray-50 rounded">
                              <div className="text-sm text-gray-500">精度</div>
                              <div className="text-lg font-bold text-gray-900">{robot.accuracy}</div>
                            </div>
                            <div className="text-center p-2 bg-gray-50 rounded">
                              <div className="text-sm text-gray-500">成功率</div>
                              <div className="text-lg font-bold text-green-600">{robot.successRate}</div>
                            </div>
                            <div className="text-center p-2 bg-gray-50 rounded">
                              <div className="text-sm text-gray-500">患者评分</div>
                              <div className="text-lg font-bold text-yellow-600 flex items-center justify-center gap-1">
                                <Star className="w-4 h-4 fill-current" />
                                {robot.patientRating}
                              </div>
                            </div>
                          </div>

                          {/* 适应症标签 */}
                          <div className="flex items-center gap-2 mb-4">
                            <span className="text-sm text-gray-500">适应症:</span>
                            {robot.indications.map(ind => (
                              <span key={ind} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded">
                                {ind.toUpperCase()}
                              </span>
                            ))}
                          </div>

                          {/* 操作按钮（类似汽车之家的：报价/论坛/图库） */}
                          <div className="flex items-center gap-3">
                            <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 text-sm font-medium">
                              查看详情
                            </button>
                            <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 text-sm font-medium flex items-center gap-1">
                              <Calculator className="w-4 h-4" />
                              费用计算
                            </button>
                            <button className="px-4 py-2 bg-green-50 text-green-600 rounded hover:bg-green-100 text-sm font-medium flex items-center gap-1">
                              <Hospital className="w-4 h-4" />
                              {robot.hospitalCount}家医院
                            </button>
                            <button
                              onClick={() => toggleCompare(robot)}
                              className={`px-4 py-2 rounded text-sm font-medium flex items-center gap-1 ${
                                isInCompare
                                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                                  : 'border border-gray-300 text-gray-600 hover:border-blue-600 hover:text-blue-600'
                              }`}
                            >
                              {isInCompare ? '✓ 已选' : '+ 对比'}
                            </button>
                            <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded hover:border-blue-600 hover:text-blue-600 text-sm font-medium flex items-center gap-1">
                              <MessageCircle className="w-4 h-4" />
                              咨询
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* 特色亮点（类似汽车之家的卖点） */}
                      {robot.advantages && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-500">亮点:</span>
                            {robot.advantages.slice(0, 3).map((adv, idx) => (
                              <span key={idx} className="text-green-600">
                                ✓ {adv}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 右侧：热门榜单 + 快捷工具（汽车之家风格） */}
          <div className="w-80 space-y-6">
            {/* 热门榜单 */}
            <div className="bg-white rounded-lg shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  热门机器人
                </h3>
                <span className="text-xs text-gray-500">装机量排行</span>
              </div>
              <div className="space-y-3">
                {hotRobots.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors border border-gray-100"
                  >
                    <div className={`w-8 h-8 rounded flex items-center justify-center font-bold text-white ${
                      idx === 0 ? 'bg-red-500' : idx === 1 ? 'bg-orange-500' : 'bg-yellow-500'
                    }`}>
                      {item.rank}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{item.robot?.name}</div>
                      <div className="text-xs text-gray-500">{item.label}</div>
                    </div>
                    <div className="text-sm font-bold text-orange-600">
                      {item.robot?.estimatedCost}万
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 快捷工具 */}
            <div className="bg-white rounded-lg shadow-sm p-5">
              <h3 className="font-bold text-gray-900 mb-4">快捷工具</h3>
              <div className="space-y-2">
                <a href="#calculator" className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calculator className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-700 group-hover:text-blue-600">费用计算器</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </a>
                <a href="#hospitals" className="flex items-center justify-between p-3 rounded-lg hover:bg-green-50 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="font-medium text-gray-700 group-hover:text-green-600">找医院</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </a>
                <a href="#reviews" className="flex items-center justify-between p-3 rounded-lg hover:bg-yellow-50 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-yellow-600" />
                    </div>
                    <span className="font-medium text-gray-700 group-hover:text-yellow-600">患者评价</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </a>
              </div>
            </div>

            {/* 今日推荐（类似汽车之家的编辑推荐） */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-sm p-5 text-white">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-5 h-5" />
                <h3 className="font-bold">编辑推荐</h3>
              </div>
              <div className="space-y-2 text-sm">
                <p>💡 预算5-8万？国产机器人性价比之选</p>
                <p>🏥 北京地区MAKO装机医院全汇总</p>
                <p>📊 2024年髋膝机器人手术量数据报告</p>
              </div>
              <button className="mt-4 w-full py-2 bg-white/20 hover:bg-white/30 rounded text-sm font-medium transition-colors">
                查看更多推荐
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutohomeStyleHome;
