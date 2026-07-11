import React from "react";
import { useSelector } from "react-redux";

const ROLE_STYLES = {
  مدیر: "bg-violet-100 text-violet-700",
  admin: "bg-violet-100 text-violet-700",
  کاربر: "bg-sky-100 text-sky-700",
  user: "bg-sky-100 text-sky-700",
};

function TweetAction({ icon, label, hoverColor = "hover:bg-gray-100 hover:text-gray-700", onClick }) {
  return (
    <button
      onClick={onClick}
      className={`group flex items-center gap-1.5 px-3 py-2 rounded-full text-gray-400 transition-colors ${hoverColor}`}
      aria-label={label}
    >
      <span className="text-lg group-hover:scale-110 transition-transform">{icon}</span>
    </button>
  );
}

function Tweet({ id, title, body, userId, onDelete, onEdit }) {
  const currentUser = useSelector((state) => state.auth.user);
  const users = useSelector((state) => state.users.users);

  const author = users.find((user) => user.id === userId);

  const canManage =
    currentUser &&
    (currentUser.role === "admin" ||
      currentUser.role === "مدیر" ||
      currentUser.id === userId);

  const initials = author?.name
    ?.split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const roleClass =
    ROLE_STYLES[author?.role] || "bg-gray-100 text-gray-600";

  return (
    <article className="px-6 py-5 hover:bg-sky-50/40 transition-colors duration-200 cursor-default">
      <div className="flex gap-3">
        <div className="w-11 h-11 shrink-0 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white text-sm font-bold shadow-sm">
          {initials || "?"}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-gray-900">{author?.name || "ناشناس"}</span>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${roleClass}`}>
              {author?.role}
            </span>
          </div>

          <h3 className="font-bold text-[17px] text-gray-900 mt-1 leading-snug">
            {title}
          </h3>

          <p className="mt-2 text-[15px] text-gray-700 leading-7">
            {body}
          </p>

          <div className="flex items-center gap-1 mt-4 -mr-2">
            <TweetAction icon="💬" label="پاسخ" hoverColor="hover:bg-sky-50 hover:text-sky-500" />
            <TweetAction icon="🔄" label="بازنشر" hoverColor="hover:bg-green-50 hover:text-green-500" />
            <TweetAction icon="🤍" label="پسندیدن" hoverColor="hover:bg-pink-50 hover:text-pink-500" />

            {canManage && (
              <>
                <TweetAction
                  icon="🗑️"
                  label="حذف"
                  hoverColor="hover:bg-red-50 hover:text-red-500"
                  onClick={() => onDelete(id)}
                />
                <TweetAction
                  icon="✏️"
                  label="ویرایش"
                  hoverColor="hover:bg-amber-50 hover:text-amber-600"
                  onClick={() => onEdit({ id, title, body, userId })}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default Tweet;
