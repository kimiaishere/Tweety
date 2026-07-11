import React from 'react';
import { SIDEBAR_ITEMS } from '../constants';

function Sidebar({ onNewTweet }) {
  return (
    <aside className="w-[240px] h-full bg-white/60 border-l border-gray-100 flex flex-col shrink-0">
      <div className="px-6 py-5 border-b border-gray-100 shrink-0">
        <h1 className="text-2xl font-bold bg-gradient-to-l from-sky-500 to-indigo-600 bg-clip-text text-transparent">
          🕊️ توییتر
        </h1>
      </div>

      <nav className="px-3 py-4 space-y-1 flex-1 overflow-y-auto">
        {SIDEBAR_ITEMS.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
              item.active
                ? "bg-sky-50 text-sky-600 font-semibold shadow-sm"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-[15px]">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 shrink-0">
        <button
          onClick={onNewTweet}
          className="w-full bg-gradient-to-l from-sky-500 to-indigo-600 text-white font-bold py-3 px-4 rounded-full shadow-lg shadow-sky-200 hover:shadow-xl hover:shadow-sky-300 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          توییت جدید ✨
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
