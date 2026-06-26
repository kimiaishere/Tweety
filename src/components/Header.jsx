import React from 'react';
import { TABS } from '../constants';

function Header({ activeTab, onTabChange, onToggleNotifications }) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
      <div className="px-4 py-3 flex justify-between items-center">
        <div />
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleNotifications}
            className="p-2 rounded-full"
          >
            🔔
          </button>
          <button className="p-2 rounded-full">👤</button>
        </div>
      </div>
      <div className="flex border-b border-gray-200">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onTabChange(tab.value)}
            className={`flex-1 py-3 text-center font-medium relative ${
              activeTab === tab.value ? "text-blue-600" : "text-gray-500"
            }`}
          >
            {tab.label}
            {activeTab === tab.value && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-blue-500 rounded-full" />
            )}
          </button>
        ))}
      </div>
    </header>
  );
}

export default Header;