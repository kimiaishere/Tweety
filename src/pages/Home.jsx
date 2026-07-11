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
      <div className="min-h-screen flex items-center justify-center">
        loading...
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50" dir="rtl">
      <div className="max-w-5xl mx-auto h-full bg-white border border-gray-300 shadow-xl rounded-2xl overflow-hidden flex">
        
        {/* سایدبار - با flex در کنار محتوا */}
        <Sidebar onNewTweet={() => setIsModalOpen(true)} />

        {/* بخش اصلی - فضای باقیمانده را پر می‌کند */}
        <div className="flex-1 flex flex-col min-w-0">
          <Header />

          <div>
            <SearchBar onSearchResult={setSearch} />
          </div>

          <div className="flex-1 overflow-y-auto">
            <TweetList
              tweets={currentPosts}
              onDelete={deleteTweet}
              onEdit={setEditing}
            />
          </div>

          {/* pagination */}
          <div className="flex border-t mb-4 pt-4 border-gray-200 justify-center gap-4 shrink-0">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 bg-blue-500 text-white rounded-lg disabled:opacity-50"
            >
              قبلی
            </button>

            <span className="flex items-center">
              {page} / {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 bg-blue-500 text-white rounded-lg disabled:opacity-50"
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