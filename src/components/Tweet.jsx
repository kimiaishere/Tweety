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
    <div className="px-6 pb-6 pt-4 hover:bg-gray-50 transition-colors duration-150">

      <div className="flex justify-between items-start">

        <div>

        <div className="text-[14px]">
        نویسنده:
  <span
    className="px-2 py-1">
  
    {author?.role}
  </span>
</div>
          <h3 className="font-bold text-lg pt-3">
            {title}
          </h3>

        </div>

      </div>

      <p className="mt-6 text-[15px] leading-7">
        {body}
      </p>
      <div className="flex gap-20 items-center mt-10">

  <button>💬</button>
  <button>🔄</button>
  <button>🤍</button>

  {canManage && (
    <>
      <button onClick={() => onDelete(id)}>
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