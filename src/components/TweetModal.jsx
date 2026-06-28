import React from 'react';

function TweetModal({
  open,
  form,
  setForm,
  onSubmit,
  onClose,
  editingTweet,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">
  {editingTweet ? "Edit Tweet" : "New Tweet"}
</h2>
          <button onClick={onClose} className="text-gray-500 text-2xl">
            ×
          </button>
        </div>
        <form onSubmit={onSubmit} className="p-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Title (optional)
            </label>
            <input
              autoFocus
              type="text"
              value={form.title}
              placeholder="Tweet title..."
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
              className="w-full p-3 border border-gray-300 rounded-xl"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Content *
            </label>
            <textarea
              rows="5"
              maxLength="280"
              value={form.body}
              placeholder="What's happening?"
              onChange={(e) =>
                setForm({
                  ...form,
                  body: e.target.value,
                })
              }
              className="w-full p-3 border border-gray-300 rounded-xl resize-none"
            />
            <div className="flex justify-between mt-1 text-xs text-gray-400">
              <span>{form.body.length}/280</span>
              <span>Maximum 280 characters</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={!form.body.trim()}
              className="flex-1 bg-blue-500 text-white font-bold py-3 px-4 rounded-full"
            >
             {editingTweet ? "Save Changes" : "Post 🚀"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-full"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TweetModal;