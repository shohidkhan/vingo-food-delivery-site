import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-md z-50">
      <div className="rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.25)] p-10">
        <span className="loading loading-spinner loading-xl text-orange-500"></span>
      </div>
    </div>
  );
};

export default Loading;
