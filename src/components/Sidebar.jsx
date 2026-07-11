import React from "react";
import { SIDEBAR_ITEMS } from "../constants";
import UserAvatar from "./UserAvatar";

function Sidebar({ onNewTweet, user, bookmarksCount = 0 }) {
  return (
    <aside className="hidden sm:flex w-56 lg:w-64 xl:w-72 h-full bg-white border-l border-gray-100 flex-col shrink-0">
      <div className="px-5 py-5 border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🕊️</span>
          <h1 className="text-xl font-bold bg-gradient-to-l from-brand-600 to-violet-600 bg-clip-text text-transparent">
            توییتی
          </h1>
        </div>
      </div>

      <nav className="px-3 py-4 space-y-1 flex-1">
        {SIDEBAR_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm ${
              item.id === "home"
                ? "bg-brand-50 text-brand-600 font-semibold shadow-sm"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
            {item.id === "bookmarks" && bookmarksCount > 0 && (
              <span className="mr-auto bg-violet-100 text-violet-600 text-xs font-bold px-2 py-0.5 rounded-full">
                {bookmarksCount}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="px-3 pb-4 space-y-3 shrink-0">
        <button
          onClick={onNewTweet}
          className="w-full bg-brand-500 hover:bg-brand-600 active:scale-[0.98] text-white font-bold py-3 px-4 rounded-full shadow-lg shadow-blue-200/60 transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          توییت جدید
        </button>

        {user && (
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
            <UserAvatar user={user} size="sm" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
              <p className="text-xs text-gray-400 truncate">{user.role}</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
