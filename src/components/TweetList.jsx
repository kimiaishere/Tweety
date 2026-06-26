import React from 'react';
import Tweet from './Tweet';

function TweetList({ tweets }) {
  return (
    <div className="divide-y divide-gray-200 ml-6">
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} title={tweet.title} body={tweet.body} />
      ))}
    </div>
  );
}

export default TweetList;