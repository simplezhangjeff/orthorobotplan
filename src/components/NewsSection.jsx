import React from 'react';
import { Newspaper, ChevronRight, ExternalLink } from 'lucide-react';

const NewsSection = ({ news, showAllNews, setShowAllNews, setShowPolicyDetail }) => {
  const displayedNews = showAllNews ? news : news.filter(item => item.isHot);

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-between">
          <div className="flex items-center">
            <Newspaper className="w-5 h-5 text-blue-600 mr-2" />
            <h2 className="font-bold text-gray-900">行业动态</h2>
          </div>
          <button
            onClick={() => setShowAllNews(!showAllNews)}
            className="text-blue-600 text-sm font-medium flex items-center hover:underline"
          >
            {showAllNews ? '收起' : '查看全部'}
            <ChevronRight className={`w-4 h-4 ml-1 transition-transform ${showAllNews ? 'rotate-90' : ''}`} />
          </button>
        </div>
        <div className="divide-y">
          {displayedNews.map((item) => (
            <div
              key={item.id}
              className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => item.isHot && setShowPolicyDetail(true)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {item.isHot && (
                      <span className="bg-red-500 text-white px-1.5 py-0.5 rounded text-xs font-bold animate-pulse">
                        HOT
                      </span>
                    )}
                    <span className={`${item.tagColor} px-2 py-0.5 rounded text-xs font-medium`}>
                      {item.tag}
                    </span>
                    <span className="text-xs text-gray-400">{item.date}</span>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">{item.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{item.summary}</p>
                  <p className="text-xs text-gray-400 mt-1">来源：{item.source}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-300 flex-shrink-0 mt-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
