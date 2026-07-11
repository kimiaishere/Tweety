import React from "react";
import Tweet from "./Tweet";

function TweetList({ tweets, onDelete, onEdit, bookmarks = [], onToggleBookmark }) {
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
          isBookmarked={bookmarks.includes(tweet.id)}
          onToggleBookmark={onToggleBookmark}
        />
      ))}
    </div>
  );
}

export default TweetList;
