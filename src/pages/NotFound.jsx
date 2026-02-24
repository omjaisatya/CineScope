import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-9xl font-black text-cyan-400 drop-shadow-lg">404</h1>
      <div className="border-l-4 border-cyan-500 pl-4 my-6 text-left">
        <p className="text-2xl font-bold tracking-tight">Page Not Found</p>
        <p className="text-slate-300 mt-1">
          The page you are looking for does not exist.
        </p>
      </div>
      <Link
        to="/"
        className="rounded-full bg-cyan-500 px-8 py-3 font-bold text-white transition hover:bg-cyan-400 shadow-lg shadow-cyan-500/30"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;
