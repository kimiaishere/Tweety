import { SIDEBAR_ITEMS } from "./constants";

function MobileBottomNav({ onNewTweet, onExplore, bookmarksCount = 0 }) {
  const leftItems = [
    { ...SIDEBAR_ITEMS[0] },
    { icon: "🔍", label: "کاوش", id: "explore", onClick: onExplore },
  ];

  const rightItems = [
    { ...SIDEBAR_ITEMS[1] },
    { ...SIDEBAR_ITEMS[2] },
  ];

  const NavButton = ({ item, active = false }) => (
    <button
      type="button"
      onClick={item.onClick}
      className={`relative flex flex-col items-center gap-0.5 flex-1 py-2 rounded-xl transition-colors ${
        active ? "text-brand-600" : "text-gray-500 active:text-brand-600"
      }`}
    >
      <span className="text-xl leading-none">{item.icon}</span>
      <span className="text-[10px] font-medium">{item.label}</span>
      {item.id === "bookmarks" && bookmarksCount > 0 && (
        <span className="absolute top-0.5 left-1/2 translate-x-2 min-w-[16px] h-4 bg-violet-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-1">
          {bookmarksCount}
        </span>
      )}
    </button>
  );

  return (
    <nav
      className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-100 safe-area-bottom"
      aria-label="منوی اصلی"
    >
      <div className="flex items-end justify-around px-1 pt-1 pb-1.5">
        {leftItems.map((item) => (
          <NavButton key={item.id} item={item} active={item.id === "home"} />
        ))}

        <button
          type="button"
          onClick={onNewTweet}
          className="flex flex-col items-center flex-1 -mt-4"
          aria-label="توییت جدید"
        >
          <span className="w-12 h-12 bg-brand-500 hover:bg-brand-600 active:scale-95 text-white rounded-full shadow-lg shadow-blue-300/40 flex items-center justify-center transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
          </span>
        </button>

        {rightItems.map((item) => (
          <NavButton key={item.id} item={item} />
        ))}
      </div>
    </nav>
  );
}

export default MobileBottomNav;
