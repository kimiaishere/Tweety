import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import TweetList from '../components/TweetList';
import TweetModal from '../components/TweetModal';
import NotificationPanel from '../components/NotificationPanel';
import SearchBar from '../components/SearchBar'; // اضافه کردن ایمپورت

export default function Home() {
  const [tweets, setTweets] = useState([]);
  const [filteredTweets, setFilteredTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [activeTab, setActiveTab] = useState("for-you");
  const [showNotifications, setShowNotifications] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    body: "",
  });
  const [editingTweet, setEditingTweet] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const totalPages = Math.ceil(100 / limit);

  useEffect(() => {
    setLoading(true);

    fetch(
      `http://localhost:3000/posts?_page=${page}&_limit=${limit}`
    )
      .then((res) => res.json())
      .then((data) => {
        setTweets(data);
        setFilteredTweets(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [page]);


  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredTweets(tweets);
    } else {
      const filtered = tweets.filter(tweet =>
        tweet.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTweets(filtered);
    }
  }, [searchQuery, tweets]);

  const resetForm = () => {
    setForm({
      title: "",
      body: "",
    });
  
    setEditingTweet(null);
  
    setIsModalOpen(false);
  };

  const addTweet = (e) => {
    e.preventDefault();
    if (!form.body.trim()) return;

    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.title,
        body: form.body,
        userId: 1,
      }),
    })
      .then((res) => res.json())
      .then((newPost) => {
        const updatedTweets = [
          {
            ...newPost,
            title: form.title,
            body: form.body,
          },
          ...tweets,
        ];
        setTweets(updatedTweets);
        setFilteredTweets(updatedTweets);
        resetForm();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        در حال بارگذاری...
      </div>
    );
  }

  const deleteTweet = (id) => {
    fetch(`http://localhost:3000/posts/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedTweets = tweets.filter((tweet) => tweet.id !== id);
        setTweets(updatedTweets);
        setFilteredTweets(updatedTweets);
      })
      .catch((err) => console.error(err));
  };

  const updateTweet = (id, updatedData) => {
    fetch(`http://localhost:3000/posts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((updatedPost) => {
        const updatedTweets = tweets.map((tweet) =>
          tweet.id === id ? updatedPost : tweet
        );
        setTweets(updatedTweets);
        setFilteredTweets(updatedTweets);
      });
  };

  const editTweet = (tweet) => {
    setEditingTweet(tweet);
    setForm({
      title: tweet.title,
      body: tweet.body,
    });
    setIsModalOpen(true);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    updateTweet(editingTweet.id, {
      title: form.title,
      body: form.body,
    });
    resetForm();
  };

  const handleSearchResult = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="bg-gray-50 min-h-screen" dir="rtl">
      <div className="max-w-5xl mx-auto bg-white shadow-lg min-h-screen relative">
        <Sidebar onNewTweet={() => setIsModalOpen(true)} />

        <main className="mr-64">
          <Header
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onToggleNotifications={() =>
              setShowNotifications(!showNotifications)
            }
          />
          
          
          <div className="flex justify-center px-4 py-3 border-b border-gray-200">
            <SearchBar onSearchResult={handleSearchResult} />
          </div>

          <TweetList
            tweets={filteredTweets}
            onDelete={deleteTweet}
            onEdit={editTweet}
          />
          
          <div className="flex justify-center gap-3 py-7">
            <button className="cursor-pointer"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              قبلی
            </button>

            <span>
              صفحه {page}
            </span>

            <button className="cursor-pointer"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              بعدی
            </button>
          </div>
        </main>

        <TweetModal
          open={isModalOpen}
          form={form}
          setForm={setForm}
          onSubmit={editingTweet ? saveEdit : addTweet}
          onClose={resetForm}
          editingTweet={editingTweet}
        />

        {showNotifications && (
          <NotificationPanel onClose={() => setShowNotifications(false)} />
        )}
      </div>
    </div>
  );
}