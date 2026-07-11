import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import SearchBar from "./SearchBar";

function Header({ onSearchResult, onToggleNotifications }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const posts = useSelector((state) => state.posts.posts);

  if (!user) return null;

  const userPostsCount = posts.filter(
    (post) => post.userId === user.id
  ).length;

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logout());
    toast.success("با موفقیت خارج شدید.");
    navigate("/login");
  };

  const initials = user.name
    ?.split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-20 bg-white/70 backdrop-blur-md border-b border-gray-100 px-5 py-3">
      <div className="flex justify-between items-center gap-4">
        <SearchBar onSearchResult={onSearchResult} />

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onToggleNotifications}
            className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:bg-sky-50 hover:text-sky-600 transition-colors"
            aria-label="اعلان‌ها"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 text-white text-sm font-bold hover:shadow-lg hover:scale-105 transition-all"
            >
              {initials || "👤"}
            </button>

            {showMenu && (
              <div className="absolute left-0 mt-2 w-52 z-50 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-br from-sky-500 to-indigo-600 px-4 py-5 text-white">
                  <p className="font-bold text-lg" dir="ltr">
                    {user.name}
                  </p>
                  <p className="text-sky-100 text-sm mt-0.5">{user.role}</p>
                </div>

                <div className="p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">تعداد پست‌ها</span>
                    <span className="font-semibold text-gray-800 bg-gray-100 px-2.5 py-0.5 rounded-full">
                      {userPostsCount}
                    </span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full mt-1 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                  >
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
