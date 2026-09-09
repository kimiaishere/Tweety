function TweetModal({ open, form, setForm, onSubmit, onClose, editingTweet }) {
  if (!open) return null;

  const charCount = form.body.length;
  const charLimit = 280;
  const isNearLimit = charCount > charLimit * 0.8;
  const isOverLimit = charCount > charLimit;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl max-w-lg w-full animate-slide-up">
        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
            >
              ✕
            </button>
            <h2 className="text-lg font-bold text-gray-800">
              {editingTweet ? "ویرایش توییت" : "توییت جدید"}
            </h2>
          </div>
        </div>

        <form onSubmit={onSubmit} className="p-5">
          <div className="mb-4">
            <input
              autoFocus
              type="text"
              value={form.title}
              placeholder="عنوان (اختیاری)"
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
            />
          </div>

          <div className="mb-5 relative">
            <textarea
              rows="6"
              maxLength={charLimit}
              value={form.body}
              placeholder="چه خبر؟ ایده یا نظرت را بنویس..."
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              className="w-full p-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-blue-100 transition-all text-[15px] leading-relaxed"
            />

            <div className="absolute bottom-3 left-3 flex items-center gap-2">
              <div
                className={`text-xs font-medium ${
                  isOverLimit
                    ? "text-red-500"
                    : isNearLimit
                      ? "text-amber-500"
                      : "text-gray-400"
                }`}
              >
                {charCount}/{charLimit}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-full transition-colors text-sm"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={!form.body.trim() || isOverLimit}
              className="flex-1 bg-brand-500 hover:bg-brand-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-full transition-all shadow-md shadow-blue-200/50 text-sm"
            >
              {editingTweet ? "ذخیره تغییرات" : "انتشار 🚀"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TweetModal;
