import React from "react";

const AIDietSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid gap-4 md:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="h-32 rounded-2xl bg-slate-800" />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="h-48 rounded-2xl bg-slate-800" />
        ))}
      </div>
    </div>
  );
};

export default AIDietSkeleton;
