import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import TweetList from "../components/TweetList";
import TweetModal from "../components/TweetModal";
import NotificationPanel from "../components/NotificationPanel";
import SearchBar from "../components/SearchBar";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const limit = 10;

  // ---------------- FETCH ----------------
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

  // ---------------- FILTER ----------------
  const filtered = useMemo(() => {
    return posts.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [posts, search]);

  // ---------------- PAGINATION ----------------
  const totalPages = Math.ceil(filtered.length / limit);

  const currentPosts = useMemo(() => {
    const start = (page - 1) * limit;
    return filtered.slice(start, start + limit);
  }, [filtered, page]);

  // ---------------- ADD ----------------
  const addTweet = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: editing?.title || "",
        body: editing?.body || "",
        userId: user.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(addPost(data));
        setIsModalOpen(false);
      });
  };

  // ---------------- DELETE ----------------
  const deleteTweet = (id) => {
    fetch(`http://localhost:3000/posts/${id}`, {
      method: "DELETE",
    }).then(() => {
      dispatch(deletePost(id));
    });
  };

  // ---------------- UPDATE ----------------
  const updateTweet = (id, data) => {
    fetch(`http://localhost:3000/posts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((r) => r.json())
      .then((updated) => {
        dispatch(updatePost(updated));
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-50 via-white to-indigo-50 gap-4">
        <div className="w-10 h-10 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 text-sm font-medium">در حال بارگذاری...</p>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-sky-50 via-slate-50 to-indigo-100 p-3 md:p-5" dir="rtl">
      <div className="max-w-5xl mx-auto h-full bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_8px_40px_rgba(14,165,233,0.12)] rounded-3xl overflow-hidden flex">

        <Sidebar onNewTweet={() => setIsModalOpen(true)} />

        <div className="flex-1 flex flex-col min-w-0">
          <Header onSearchResult={setSearch} />

          <div className="flex-1 overflow-y-auto">
            <TweetList
              tweets={currentPosts}
              onDelete={deleteTweet}
              onEdit={setEditing}
            />
          </div>

          <div className="flex border-t border-gray-100 px-6 py-4 justify-center items-center gap-3 shrink-0 bg-white/50">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-5 py-2 bg-sky-500 text-white text-sm font-medium rounded-full hover:bg-sky-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
            >
              قبلی
            </button>

            <span className="flex items-center text-sm text-gray-500 font-medium min-w-[4rem] justify-center">
              {page} / {totalPages || 1}
            </span>

            <button
              disabled={page === totalPages || totalPages === 0}
              onClick={() => setPage(page + 1)}
              className="px-5 py-2 bg-sky-500 text-white text-sm font-medium rounded-full hover:bg-sky-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
            >
              بعدی
            </button>
          </div>
        </div>

        {isModalOpen && (
          <TweetModal
            onSubmit={addTweet}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
}