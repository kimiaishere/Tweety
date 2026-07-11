import React, { useState } from "react";
import { TABS } from "../constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import SearchBar from "./SearchBar";

function Header({
  activeTab,
  onTabChange,
  onToggleNotifications,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

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
    <header className="flex justify-between pr-5 bg-white border-b border-gray-200 sticky top-2 pb-2 z-20">

        <div>
            <SearchBar onSearchResult={setSearch} />
        </div>
        <div className="flex flex-row py-4 px-3 gap-4 justify-end">
          <button
            onClick={onToggleNotifications}
            className="flex rounded-full text-xl"
          >
            🔔
          </button>

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center cursor-pointer text-xl"
            >
              👤
            </button>

            {showMenu && (
              <div className="absolute left-[-8px] mt-3 w-40 z-50 bg-white rounded-xl shadow-xl border border-gray-300 p-4 flex flex-col gap-5">

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
                  className="mt-5 text-red-500 hover:text-red-700"
                >
                  خروج از حساب
                </button>

              </div>
            )}
          </div>
          </div>
      
    </header>
  );
}

export default Header;