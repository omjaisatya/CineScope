import React from "react";

const Loading = ({
  message = "Fetching awesome movies...",
  fullScreen = true,
}) => {
  const containerClasses = fullScreen
    ? "fixed inset-0 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm z-50"
    : "flex h-full items-center justify-center bg-slate-900 p-8";

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-cyan-500 border-t-transparent"></div>

        <p className="text-cyan-400 animate-pulse text-lg font-medium">
          {message}
        </p>
      </div>
    </div>
  );
};

export default Loading;
