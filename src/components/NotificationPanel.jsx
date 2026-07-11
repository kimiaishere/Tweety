import React from "react";

function NotificationPanel({ onClose, postsCount = 0 }) {
  const notifications = [
    {
      icon: "✅",
      title: "خوش آمدید!",
      desc: "به توییتی خوش آمدید. اولین توییت خود را بنویسید.",
      time: "همین الان",
      bg: "bg-emerald-50",
    },
    {
      icon: "📝",
      title: `${postsCount} توییت`,
      desc: postsCount > 0 ? "شما توییت‌های منتشر شده دارید." : "هنوز توییتی منتشر نکرده‌اید.",
      time: "امروز",
      bg: "bg-blue-50",
    },
    {
      icon: "🔔",
      title: "اعلان‌های جدید",
      desc: "وقتی کسی توییت شما را پسند کند، اینجا اطلاع می‌دهیم.",
      time: "دیروز",
      bg: "bg-violet-50",
    },
  ];

  return (
    <div className="border-b border-gray-100 bg-white animate-slide-up">
      <div className="flex justify-between items-center px-5 py-3 border-b border-gray-50">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          <span>🔔</span> اعلان‌ها
        </h3>
        <button
          onClick={onClose}
          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 transition-colors text-sm"
        >
          ✕
        </button>
      </div>

      <div className="max-h-64 overflow-y-auto">
        {notifications.map((n, i) => (
          <div
            key={i}
            className="flex items-start gap-3 px-5 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className={`w-9 h-9 ${n.bg} rounded-full flex items-center justify-center text-base shrink-0`}>
              {n.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800">{n.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{n.desc}</p>
            </div>
            <span className="text-xs text-gray-400 shrink-0">{n.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotificationPanel;
