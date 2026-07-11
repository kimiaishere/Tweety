import React from "react";
import { useSelector } from "react-redux";

function Tweet({
  id,
  title,
  body,
  userId,
  onDelete,
  onEdit,
}) {

  const currentUser = useSelector(
    (state) => state.auth.user
  );

  const users = useSelector(
    (state) => state.users.users
  );

  const author = users.find(
    (user) => user.id === userId
  );

  const canManage =
    currentUser &&
    (
      currentUser.role === "admin" ||
      currentUser.id === userId
    );

  return (
    <div className="p-4 hover:bg-gray-50 transition-colors duration-150">

      <div className="flex justify-between items-start">

        <div>

          <h3 className="font-bold text-lg">
            {title}
          </h3>

          <div className="flex gap-2 mt-1 items-center">

            <span
              className={`text-xs px-2 py-1 rounded-full ${
                author?.role === "admin"
                  ? "bg-red-100 text-red-600"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              {author?.role}
            </span>

          </div>

        </div>

      </div>

      <p className="mt-6 text-[15px] leading-7">
        {body}
      </p>

      <div className="flex justify-between mt-10 max-w-sm">

        <button>
          💬
        </button>

        <button>
          🔄
        </button>

        <button>
          🤍
        </button>

        {canManage && (
          <>
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
                  userId,
                })
              }
            >
              ✏️
            </button>
          </>
        )}

      </div>

    </div>
  );
}

export default Tweet;