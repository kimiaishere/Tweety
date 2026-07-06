import React, { useState } from "react";
import { TABS } from "../constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

function Header({
  activeTab,
  onTabChange,
  onToggleNotifications,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const posts = useSelector((state) => state.posts.posts);

  if (!user) return null;

  // تعداد پست‌های همین کاربر
  const userPostsCount = posts.filter(
    (post) => post.userId === user.id
  ).length;

  const handleLogout = () => {
    localStorage.removeItem("user");

    dispatch(logout());

    toast.success("با موفقیت خارج شدید.");

    navigate("/login");
  };

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

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-2 cursor-pointer"
            >
              👤
            </button>

            {showMenu && (
              <div className="absolute left-[-20px] mt-3 w-40 z-50 bg-white rounded-xl shadow-lg border p-4 flex flex-col gap-2">

                <h3
                  dir="ltr"
                  className="font-bold text-center"
                >
                  Hi {user.name}
                </h3>

                <p className="text-center text-gray-500">
                  Role : {user.role}
                </p>

                <p className="text-center text-gray-500">
                  Posts : {userPostsCount}
                </p>

                <button
                  onClick={handleLogout}
                  className="mt-2 text-red-500 hover:text-red-700"
                >
                  خروج از حساب
                </button>

              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex border-b border-gray-200">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onTabChange(tab.value)}
            className={`flex-1 py-3 text-center font-medium relative ${
              activeTab === tab.value
                ? "text-blue-600"
                : "text-gray-500"
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