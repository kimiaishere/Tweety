import { getInitials, getAvatarColor } from "../utils";

export default function UserAvatar({ user, size = "md" }) {
  if (!user) return null;

  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-xl",
  };

  return (
    <div
      className={`${sizes[size]} ${getAvatarColor(user.id)} rounded-full flex items-center justify-center text-white font-bold shrink-0 ring-2 ring-white shadow-sm`}
      title={user.name}
    >
      {getInitials(user.name)}
    </div>
  );
}
