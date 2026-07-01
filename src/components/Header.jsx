import React, { useState } from "react";
import { TABS } from "../constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Header({ activeTab, onTabChange, onToggleNotifications }) {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
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
            aria-label="اعلان‌ها"
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
              <div className="absolute flex flex-col text-sm left-[-10px] mt-3 w-30 h-40 bg-white rounded-xl shadow-lg border-gray-200 border text-center py-5">
                <span className=" flex-1 font-medium" dir="ltr">
                Hi {user.name}!
              </span>
                <button
                  onClick={logout}
                  className="w-full hover:text-red-400 cursor-pointer"
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