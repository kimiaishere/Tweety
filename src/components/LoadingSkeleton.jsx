export default function LoadingSkeleton() {
  return (
    <div className="divide-y divide-gray-100">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="px-5 py-4 flex gap-3">
          <div className="w-10 h-10 rounded-full skeleton shrink-0" />
          <div className="flex-1 space-y-3">
            <div className="flex gap-2">
              <div className="h-4 w-24 rounded skeleton" />
              <div className="h-4 w-16 rounded skeleton" />
            </div>
            <div className="h-5 w-3/4 rounded skeleton" />
            <div className="h-4 w-full rounded skeleton" />
            <div className="h-4 w-5/6 rounded skeleton" />
            <div className="flex gap-6 pt-2">
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="h-4 w-8 rounded skeleton" />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
