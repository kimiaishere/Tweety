import React from 'react';

function NotificationPanel({ onClose }) {
  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 max-w-md w-full z-40">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-gray-800">🔔 Notifications</h3>
        <button onClick={onClose} className="text-gray-500">
          ✕
        </button>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-3 p-2 rounded-lg">
          <span className="text-2xl">💬</span>
          <div className="text-left">
            <p className="text-sm text-gray-800">No comments yet</p>
            <p className="text-xs text-gray-500">Just now</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-2 rounded-lg">
          <span className="text-2xl">❤️</span>
          <div className="text-left">
            <p className="text-sm text-gray-800">No likes received</p>
            <p className="text-xs text-gray-500">Just now</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationPanel;