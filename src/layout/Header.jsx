import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import SearchBar from "../features/posts/components/SearchBar";
import UserAvatar from "../shared/components/UserAvatar";
import { TABS } from "./constants";

function Header({
  onSearchResult,
  activeTab,
  onTabChange,
  onToggleNotifications,
  showNotifications,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuRef = useRef(null);

  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  const userPostsCount = posts.filter((p) => p.userId === user.id).length;

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logout());
    toast.success("با موفقیت خارج شدید.");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="sm:hidden flex items-center justify-between px-4 py-2.5 border-b border-gray-50">
        <div className="flex items-center gap-2">
          <span className="text-xl">🕊️</span>
          <h1 className="text-lg font-bold bg-linear-to-l from-brand-600 to-violet-600 bg-clip-text text-transparent">
            توییتی
          </h1>
        </div>
      </div>

      <div className="flex border-b border-gray-100">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onTabChange(tab.value)}
            className={`flex-1 py-3 sm:py-4 text-xs sm:text-sm font-semibold transition-colors relative hover:bg-gray-50 ${
              activeTab === tab.value
                ? "text-gray-900"
                : "text-gray-500"
            }`}
          >
            {tab.label}
            {activeTab === tab.value && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-brand-500 rounded-full" />
            )}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3">
        <SearchBar onSearchResult={onSearchResult} />

        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <button
            onClick={onToggleNotifications}
            className={`relative w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
              showNotifications
                ? "bg-blue-50 text-brand-600"
                : "hover:bg-gray-100 text-gray-600"
            }`}
            title="اعلان‌ها"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {userPostsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <UserAvatar user={user} size="sm" />
            </button>

            {showMenu && (
              <div className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-56 max-w-[calc(100vw-2rem)] z-50 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-slide-up">
                <div className="p-4 bg-gradient-to-l from-blue-50 to-violet-50 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <UserAvatar user={user} size="md" />
                    <div>
                      <p className="font-bold text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </div>

                <div className="p-3 space-y-1">
                  <div className="flex items-center justify-between px-3 py-2 text-sm">
                    <span className="text-gray-500">نقش</span>
                    <span className="font-medium text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full text-xs">
                      {user.role}
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-3 py-2 text-sm">
                    <span className="text-gray-500">تعداد پست‌ها</span>
                    <span className="font-bold text-gray-800">{userPostsCount}</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 p-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    خروج از حساب
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
