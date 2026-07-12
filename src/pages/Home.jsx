import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import TweetList from "../components/TweetList";
import TweetModal from "../components/TweetModal";
import NotificationPanel from "../components/NotificationPanel";
import LoadingSkeleton from "../components/LoadingSkeleton";
import EmptyState from "../components/EmptyState";
import ExplorePanel from "../components/ExplorePanel";

import {
  setPosts,
  addPost,
  deletePost,
  updatePost,
  setLoading,
} from "../features/posts/postsSlice";
import { setUsers } from "../features/users/usersSlice";

export default function Home() {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts.posts);
  const loading = useSelector((state) => state.posts.loading);
  const user = useSelector((state) => state.auth.user);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("for-you");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: "", body: "" });
  const [showNotifications, setShowNotifications] = useState(false);
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("bookmarks") || "[]");
    } catch {
      return [];
    }
  });

  const limit = 8;

  useEffect(() => {
    dispatch(setLoading(true));

    Promise.all([
      fetch("http://localhost:3000/posts").then((r) => r.json()),
      fetch("http://localhost:3000/users").then((r) => r.json()),
    ]).then(([postsData, usersData]) => {
      dispatch(setPosts(postsData));
      dispatch(setUsers(usersData));
      dispatch(setLoading(false));
    });
  }, [dispatch]);

  useEffect(() => {
    setPage(1);
  }, [search, activeTab]);

  const filtered = useMemo(() => {
    let result = posts;

    if (activeTab === "my-posts") {
      result = result.filter((p) => p.userId === user?.id);
    }

    if (search) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    return [...result].reverse();
  }, [posts, search, activeTab, user?.id]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / limit));

  const currentPosts = useMemo(() => {
    const start = (page - 1) * limit;
    return filtered.slice(start, start + limit);
  }, [filtered, page]);

  const openNewTweetModal = useCallback(() => {
    setEditing(null);
    setForm({ title: "", body: "" });
    setIsModalOpen(true);
  }, []);

  const openEditModal = useCallback((tweet) => {
    setEditing(tweet);
    setForm({ title: tweet.title, body: tweet.body });
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setEditing(null);
    setForm({ title: "", body: "" });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.body.trim()) return;

    if (editing) {
      fetch(`http://localhost:3000/posts/${editing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: form.title, body: form.body }),
      })
        .then((r) => r.json())
        .then((updated) => {
          dispatch(updatePost(updated));
          toast.success("توییت با موفقیت ویرایش شد.");
          closeModal();
        });
    } else {
      fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          body: form.body,
          userId: user.id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(addPost(data));
          toast.success("توییت شما منتشر شد! 🎉");
          closeModal();
        });
    }
  };

  const deleteTweet = (id) => {
    fetch(`http://localhost:3000/posts/${id}`, { method: "DELETE" }).then(
      () => {
        dispatch(deletePost(id));
        toast.info("توییت حذف شد.");
      }
    );
  };

  const toggleBookmark = (id) => {
    setBookmarks((prev) => {
      const next = prev.includes(id)
        ? prev.filter((b) => b !== id)
        : [...prev, id];
      localStorage.setItem("bookmarks", JSON.stringify(next));
      return next;
    });
  };

  if (loading) {
    return (
      <div className="h-full flex flex-col bg-white" dir="rtl">
        <div className="h-16 border-b border-gray-100 bg-gray-50/50 shrink-0" />
        <div className="flex-1 overflow-hidden">
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex overflow-hidden bg-white" dir="rtl">
      <Sidebar
        user={user}
        onNewTweet={openNewTweetModal}
        bookmarksCount={bookmarks.length}
      />

      <main className="flex-1 flex flex-col min-w-0">
        <Header
          onSearchResult={setSearch}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onToggleNotifications={() => setShowNotifications((v) => !v)}
          showNotifications={showNotifications}
        />

        {showNotifications && (
          <NotificationPanel
            onClose={() => setShowNotifications(false)}
            postsCount={posts.filter((p) => p.userId === user?.id).length}
          />
        )}

        <div className="flex-1 overflow-y-auto">
          {currentPosts.length === 0 ? (
            <EmptyState
              icon={search ? "🔍" : "✍️"}
              title={search ? "نتیجه‌ای یافت نشد" : "هنوز توییتی نیست"}
              description={
                search
                  ? "عبارت جستجو را تغییر دهید یا فیلتر را بردارید."
                  : activeTab === "my-posts"
                    ? "اولین توییت خود را بنویسید!"
                    : "هنوز پستی منتشر نشده. شما اولین نفر باشید!"
              }
              action={
                !search && (
                  <button
                    onClick={openNewTweetModal}
                    className="bg-brand-500 hover:bg-brand-600 text-white font-semibold px-6 py-2.5 rounded-full transition-colors"
                  >
                    نوشتن توییت
                  </button>
                )
              }
            />
          ) : (
            <TweetList
              tweets={currentPosts}
              onDelete={deleteTweet}
              onEdit={openEditModal}
              bookmarks={bookmarks}
              onToggleBookmark={toggleBookmark}
            />
          )}
        </div>

        {filtered.length > limit && (
          <div className="flex items-center justify-center border-t border-gray-100 px-5 gap-15 py-3 shrink-0 bg-white">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="flex items-center px-4 py-2 text-sm font-medium rounded-full border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              ← قبلی
            </button>

            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (p) =>
                    p === 1 || p === totalPages || Math.abs(p - page) <= 1
                )
                .map((p, idx, arr) => (
                  <React.Fragment key={p}>
                    {idx > 0 && arr[idx - 1] !== p - 1 && (
                      <span className="text-gray-400 px-1">…</span>
                    )}
                    <button
                      onClick={() => setPage(p)}
                      className={`w-8 h-8 text-sm rounded-full transition-colors ${
                        page === p
                          ? "bg-brand-500 text-white font-bold"
                          : "hover:bg-gray-100 text-gray-600"
                      }`}
                    >
                      {p}
                    </button>
                  </React.Fragment>
                ))}
            </div>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              بعدی →
            </button>
          </div>
        )}
      </main>

      <ExplorePanel
        bookmarksCount={bookmarks.length}
        onTrendClick={(term) => setSearch(term)}
        onCategoryClick={(cat) => setSearch(cat)}
      />

      {isModalOpen && (
        <TweetModal
          open={isModalOpen}
          form={form}
          setForm={setForm}
          onSubmit={handleSubmit}
          onClose={closeModal}
          editingTweet={editing}
        />
      )}

      {/* Mobile FAB */}
      <button
        onClick={openNewTweetModal}
        className="sm:hidden fixed bottom-6 left-6 w-14 h-14 bg-brand-500 hover:bg-brand-600 text-white rounded-full shadow-xl shadow-blue-300/50 flex items-center justify-center z-30 active:scale-95 transition-all"
        title="توییت جدید"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
}
