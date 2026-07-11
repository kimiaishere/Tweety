import React from 'react';
import { SIDEBAR_ITEMS } from '../constants';

function Sidebar({ onNewTweet }) {
  return (
    <aside className="w-64 h-full bg-white border-l border-gray-200 flex flex-col shrink-0">
      {/* هدر - ثابت در بالا */}
      <div className="p-4 pb-[15px] border-b border-gray-200 shrink-0">
        <h1 className="text-2xl pt-8 font-bold text-blue-500">🕊️ توییتر</h1>
      </div>
      
      {/* ناوبری - فضای باقیمانده را پر می‌کند */}
      <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
        {SIDEBAR_ITEMS.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              item.active
                ? "bg-blue-50 text-blue-600 font-medium"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      
      {/* دکمه توییت - چسبیده به پایین */}
      <div className="p-4 shrink-0">
        <button
          onClick={onNewTweet}
          className="w-full bg-blue-500 text-white font-bold py-2 px-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
        >
          توییت جدید ✨
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;