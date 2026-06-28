import React from 'react';

function Tweet({title, body, onDelete, id, onEdit }) {
  return (
    <div className="p-4 hover:bg-gray-50 transition-colors duration-150">
      <h3 className="font-bold text-lg text-gray-900">{title}</h3>
      <p className="mt-1 text-[15px] leading-6 text-gray-800 text-left">
        {body}
      </p>
      <div className="flex justify-between mt-3 max-w-sm text-gray-500">
        <button className="cursor-default">💬</button>
        <button className="cursor-default">🔄</button>
        <button className="cursor-default">🤍</button>
        <button
          onClick={() => onDelete(id)}
        >
          🗑️
        </button>
        <button
  onClick={() =>
    onEdit({
      id,
      title,
      body,
    })
  }
>
  ✏️
</button>
      </div>
    </div>
  );
}

export default Tweet;