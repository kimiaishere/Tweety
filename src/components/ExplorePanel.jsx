import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import UserAvatar from "./UserAvatar";
import { TRENDING_TOPICS, EXPLORE_CATEGORIES } from "../constants";

function PanelCard({ title, action, children, className = "" }) {
  return (
    <section
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden ${className}`}
    >
      {(title || action) && (
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          {title && (
            <h3 className="font-bold text-[15px] text-gray-900">{title}</h3>
          )}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export default function ExplorePanel({
  bookmarksCount = 0,
  onTrendClick,
  onCategoryClick,
}) {
  const user = useSelector((state) => state.auth.user);
  const users = useSelector((state) => state.users.users);
  const posts = useSelector((state) => state.posts.posts);

  const [followed, setFollowed] = useState(() => new Set());
  const [panelSearch, setPanelSearch] = useState("");

  const userPostsCount = posts.filter((p) => p.userId === user?.id).length;
  const totalPosts = posts.length;

  const suggestions = useMemo(
    () => users.filter((u) => u.id !== user?.id).slice(0, 3),
    [users, user?.id]
  );

  const getUserPostCount = (userId) =>
    posts.filter((p) => p.userId === userId).length;

  const handleFollow = (u) => {
    setFollowed((prev) => new Set([...prev, u.id]));
    toast.success(`@${u.name} را دنبال کردید`);
  };

  const handlePanelSearch = (e) => {
    e.preventDefault();
    if (panelSearch.trim()) onTrendClick?.(panelSearch.trim());
  };
const [isOpen, setIsopen] = useState(false);

const ToggleMenu = () => {
  setIsopen(!isOpen);
};

  return (
    <>
    <button 
      onClick={ToggleMenu}
      className="fixed top-1/2 -translate-y-1/2 left-0 z-50 flex items-center justify-center w-8 h-16 bg-white rounded-r-xl shadow-lg border border-gray-100 border-l-0 hover:bg-gray-50 transition-all duration-300 cursor-pointer group"
      style={{ 
        transform: 'translateY(-50%)',
        left: isOpen ? '340px' : '0px',
        transition: 'left 0.3s ease'
      }}
    >
      <img 
        width="20" 
        height="20" 
        src="https://img.icons8.com/ios-glyphs/30/expand-arrow--v1.png" 
        alt="expand-arrow--v1"
        className={`transition-transform duration-300 ${isOpen ? 'rotate-270' : 'rotate-90'}`}
      />
    </button>
    
    <aside className={`${isOpen ? 'w-[340px]' : 'w-8' }
      hidden lg:flex shrink-0 flex-row bg-[#f7f9fb] border-l border-gray-100 overflow-y-auto transition-all duration-300`}>
 
<div className="w-full py-4 px-4">
      {isOpen ? (
<div>
   {/* Search */}
   <div className="flex flex-col gap-6">
   <form onSubmit={handlePanelSearch}>
     <div className="relative group">
       <input
         type="text"
         value={panelSearch}
         onChange={(e) => setPanelSearch(e.target.value)}
         placeholder="جستجو در توییتی..."
         className="w-full bg-white border border-gray-200 rounded-full py-3 pr-11 pl-4 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-gray-400 shadow-sm"
       />
       <button
         type="submit"
         className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-500 transition-colors"
       >
         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
         </svg>
       </button>
     </div>
   </form>

   {/* Hero card */}
   <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 via-blue-600 to-violet-600 p-5 text-white shadow-lg shadow-blue-200/40">
     <div className="absolute -top-6 -left-6 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
     <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl" />
     <div className="relative">
       <p className="text-xs font-medium text-blue-100 mb-1">امروز در توییتی</p>
       <p className="text-2xl font-bold mb-3">{totalPosts.toLocaleString("fa-IR")} پست</p>
       <div className="flex gap-3">
         <div className="flex-1 bg-white/15 backdrop-blur rounded-xl px-3 py-2">
           <p className="text-lg font-bold">{userPostsCount}</p>
           <p className="text-[11px] text-blue-100">پست شما</p>
         </div>
         <div className="flex-1 bg-white/15 backdrop-blur rounded-xl px-3 py-2">
           <p className="text-lg font-bold">{bookmarksCount}</p>
           <p className="text-[11px] text-blue-100">نشان‌شده</p>
         </div>
       </div>
     </div>
   </div>

   {/* Categories */}
   <PanelCard title="کاوش موضوعات">
     <div className="grid grid-cols-2 gap-2 px-4 pb-4">
       {EXPLORE_CATEGORIES.map((cat) => (
         <button
           key={cat.label}
           onClick={() => onCategoryClick?.(cat.label)}
           className="group flex items-center gap-2.5 p-3 rounded-xl border border-gray-100 hover:border-transparent hover:shadow-md transition-all bg-gray-50/50 hover:bg-white"
         >
           <div
             className={`w-8 h-8 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center text-sm shadow-sm`}
           >
             {cat.icon}
           </div>
           <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">
             {cat.label}
           </span>
         </button>
       ))}
     </div>
   </PanelCard>

   {/* Trending */}
   <PanelCard
     title="ترندهای داغ"
     action={
       <button className="text-xs text-brand-600 hover:text-brand-700 font-medium">
         مشاهده همه
       </button>
     }
   >
     <div className="pb-2">
       {TRENDING_TOPICS.map((topic, i) => (
         <button
           key={topic.tag}
           onClick={() => onTrendClick?.(topic.tag)}
           className="w-full flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-right group"
         >
           <span className="w-6 h-6 rounded-full bg-gray-100 group-hover:bg-brand-50 text-gray-500 group-hover:text-brand-600 flex items-center justify-center text-xs font-bold shrink-0 transition-colors">
             {i + 1}
           </span>
           <div className="flex-1 min-w-0">
             <p className="text-[11px] text-gray-400">{topic.category}</p>
             <p className="font-bold text-gray-900 text-sm group-hover:text-brand-600 transition-colors">
               #{topic.tag}
             </p>
             <p className="text-xs text-gray-500 mt-0.5">
               {topic.posts} پست
             </p>
           </div>
           <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0">
             {topic.trend}
           </span>
         </button>
       ))}
     </div>
   </PanelCard>

   {/* Suggested users */}
   {suggestions.length > 0 && (
     <PanelCard title="پیشنهاد دنبال کردن">
       <div className="px-4 pb-4 space-y-3">
         {suggestions.map((u) => {
           const isFollowed = followed.has(u.id);
           return (
             <div key={u.id} className="flex items-center gap-3">
               <UserAvatar user={u} size="md" />
               <div className="flex-1 min-w-0">
                 <p className="font-semibold text-sm text-gray-900 truncate">
                   {u.name}
                 </p>
                 <p className="text-xs text-gray-400 truncate">
                   {getUserPostCount(u.id)} پست · {u.role}
                 </p>
               </div>
               <button
                 onClick={() => !isFollowed && handleFollow(u)}
                 disabled={isFollowed}
                 className={`text-xs font-bold px-4 py-1.5 rounded-full transition-all shrink-0 ${
                   isFollowed
                     ? "bg-gray-100 text-gray-500 cursor-default"
                     : "bg-gray-900 text-white hover:bg-gray-800 active:scale-95"
                 }`}
               >
                 {isFollowed ? "دنبال شده" : "دنبال کردن"}
               </button>
             </div>
           );
         })}
       </div>
     </PanelCard>
   )}

   {/* Footer */}
   <div className="px-2 pb-4">
     <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-gray-400">
       {["درباره", "راهنما", "حریم خصوصی", "قوانین", "تبلیغات"].map(
         (link) => (
           <button
             key={link}
             className="hover:text-gray-600 hover:underline transition-colors"
           >
             {link}
           </button>
         )
       )}
     </div>
     <p className="text-[11px] text-gray-300 mt-3">© ۱۴۰۵ توییتی</p>
   </div>
 </div>
 </div>
) : (
  <div> </div>
)}
</div>
   </aside>
   </>
  );
}
