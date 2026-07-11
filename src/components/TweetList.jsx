import React from "react";
import Tweet from "./Tweet";

function TweetList({ tweets, onDelete, onEdit }) {
  if (tweets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
        <div className="text-5xl mb-4">🐦</div>
        <h3 className="text-lg font-bold text-gray-800">پستی یافت نشد</h3>
        <p className="text-gray-500 text-sm mt-2 max-w-xs">
          هنوز توییتی اینجا نیست یا نتیجه‌ای برای جستجوی شما پیدا نشد.
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {tweets.map((tweet) => (
        <Tweet
          key={tweet.id}
          id={tweet.id}
          title={tweet.title}
          body={tweet.body}
          userId={tweet.userId}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default TweetList;
