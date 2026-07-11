import React, { useState } from "react";
import { useSelector } from "react-redux";
import UserAvatar from "./UserAvatar";
import { getRelativeTime } from "../utils/helpers";
import MixedText from "./MixedText";

function TweetAction({ icon, activeIcon, label, count, active, onClick, activeColor = "text-red-500" }) {
  return (
    <button
      onClick={onClick}
      className={`group flex items-center gap-1.5 text-sm transition-colors ${
        active ? activeColor : "text-gray-400 hover:text-brand-500"
      }`}
      title={label}
    >
      <span className="text-base group-hover:scale-110 transition-transform">
        {active ? activeIcon : icon}
      </span>
      {count > 0 && (
        <span className="text-xs font-medium">{count}</span>
      )}
    </button>
  );
}

function Tweet({
  id,
  title,
  body,
  userId,
  onDelete,
  onEdit,
  isBookmarked,
  onToggleBookmark,
}) {
  const currentUser = useSelector((state) => state.auth.user);
  const users = useSelector((state) => state.users.users);

  const author = users.find((u) => u.id === userId);

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(() => (id * 7) % 50 + 3);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const canManage =
    currentUser &&
    (currentUser.role === "مدیر" || currentUser.id === userId);

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((c) => (liked ? c - 1 : c + 1));
  };

  const handleDelete = () => {
    onDelete(id);
    setShowConfirmDelete(false);
  };

  return (
    <article className="px-4 sm:px-5 py-4 hover:bg-gray-50/80 transition-colors animate-fade-in group">
      <div className="flex gap-3">
        <UserAvatar user={author} size="md" />

        <div className="flex-1 min-w-0">
          {/* Header row */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-1.5 flex-wrap min-w-0">
              <span className="font-bold text-gray-900 text-sm" dir="auto">
                {author?.name || "ناشناس"}
              </span>
              <span className="text-gray-400 text-sm">·</span>
              <span className="text-gray-400 text-xs">
                {getRelativeTime(id)}
              </span>
              {author?.role && (
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                  {author.role}
                </span>
              )}
            </div>

            {canManage && (
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                <button
                  onClick={() => onEdit({ id, title, body, userId })}
                  className="p-1.5 rounded-full hover:bg-blue-50 text-gray-400 hover:text-brand-500 transition-colors"
                  title="ویرایش"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => setShowConfirmDelete(true)}
                  className="p-1.5 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                  title="حذف"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Content */}
          {title && (
            <MixedText
              as="h3"
              className="font-bold text-gray-900 mt-1 text-[15px] leading-snug"
            >
              {title}
            </MixedText>
          )}
          <MixedText
            as="p"
            className="mt-1.5 text-[15px] text-gray-700 leading-relaxed whitespace-pre-wrap"
          >
            {body}
          </MixedText>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 mt-3 pt-1">
            <TweetAction
              icon="💬"
              activeIcon="💬"
              label="پاسخ"
              count={(id * 3) % 12}
            />
            <TweetAction
              icon="🔄"
              activeIcon="🔄"
              label="بازنشر"
              count={(id * 2) % 8}
            />
            <TweetAction
              icon="🤍"
              activeIcon="❤️"
              label="پسندیدن"
              count={likeCount}
              active={liked}
              onClick={handleLike}
              activeColor="text-red-500"
            />
            <button
              onClick={() => onToggleBookmark(id)}
              className={`text-base transition-all hover:scale-110 ${
                isBookmarked ? "text-brand-500" : "text-gray-400 hover:text-brand-500"
              }`}
              title={isBookmarked ? "حذف نشان" : "نشان‌گذاری"}
            >
              {isBookmarked ? "🔖" : "📑"}
            </button>
          </div>
        </div>
      </div>

      {/* Delete confirmation */}
      {showConfirmDelete && (
        <div className="mt-3 mr-13 p-3 bg-red-50 border border-red-100 rounded-xl flex items-center justify-between gap-3 animate-slide-up">
          <p className="text-sm text-red-700">آیا از حذف این توییت مطمئنید؟</p>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => setShowConfirmDelete(false)}
              className="px-3 py-1 text-xs rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              انصراف
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1 text-xs rounded-full bg-red-500 text-white hover:bg-red-600"
            >
              حذف
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

export default Tweet;
