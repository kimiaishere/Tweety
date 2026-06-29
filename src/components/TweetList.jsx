import React from "react";
import Tweet from "./Tweet";

function TweetList({ tweets, onDelete, onEdit }) {
  return (
    <div className="divide-y divide-gray-200 mr-6">
      {tweets.map((tweet) => (
        <Tweet
          key={tweet.id}
          id={tweet.id}
          title={tweet.title}
          body={tweet.body}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default TweetList;