import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TweetList from './components/TweetList';
import TweetModal from './components/TweetModal';
import NotificationPanel from './components/NotificationPanel';

export default function App() {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("for-you");
  const [showNotifications, setShowNotifications] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await res.json();
        setTweets(data.slice(0, 20));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTweets();
  }, []);

  const resetForm = () => {
    setForm({ title: "", body: "" });
    setIsModalOpen(false);
  };

  const addTweet = async (e) => {
    e.preventDefault();
    if (!form.body.trim()) return;

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          body: form.body,
          userId: 1,
        }),
      });

      const newPost = await res.json();
      setTweets((prev) => [
        {
          ...newPost,
          title: form.title,
          body: form.body,
        },
        ...prev,
      ]);
      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen" dir="ltr">
      <div className="max-w-6xl mx-auto bg-white shadow-lg min-h-screen relative">
        <Sidebar onNewTweet={() => setIsModalOpen(true)} />
        
        <main className="ml-64">
          <Header
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onToggleNotifications={() =>
              setShowNotifications(!showNotifications)
            }
          />
          <TweetList tweets={tweets} />
        </main>

        <TweetModal
          open={isModalOpen}
          form={form}
          setForm={setForm}
          onSubmit={addTweet}
          onClose={resetForm}
        />

        {showNotifications && (
          <NotificationPanel onClose={() => setShowNotifications(false)} />
        )}
      </div>
    </div>
  );
}