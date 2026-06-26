import React from 'react';
import { SIDEBAR_ITEMS } from '../constants';

function Sidebar({ onNewTweet }) {
  return (
    <aside className="absolute inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-blue-500">🕊️ Twitter</h1>
      </div>
      <nav className="p-4 space-y-1">
        {SIDEBAR_ITEMS.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
              item.active
                ? "bg-blue-50 text-blue-600 font-medium"
                : "text-gray-700"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="absolute bottom-6 left-4 right-4">
        <button
          onClick={onNewTweet}
          className="w-full bg-blue-500 text-white font-bold py-3 px-4 cursor-pointer rounded-full shadow-lg"
        >
          New Tweet ✨
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;