import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <NavLink
                to="/"
                className="text-2xl font-bold tracking-tighter text-cyan-400 uppercase"
                end
              >
                Cine<span className="text-white">Scope</span>
              </NavLink>

              <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
                <NavLink to="/movies">Movies</NavLink>
                <NavLink to="/shows">TV Shows</NavLink>
                <NavLink to="/people">People</NavLink>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative hidden lg:block">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-48 bg-slate-900 text-white text-xs rounded-full py-1.5 px-4 border border-slate-700 focus:w-64 focus:ring-1 focus:ring-cyan-500 transition-all outline-none"
                />
              </div>

              <label
                htmlFor="menu-toggle"
                className="cursor-pointer md:hidden p-2 text-slate-300 hover:text-white"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </label>
            </div>
          </div>
        </div>

        <input type="checkbox" id="menu-toggle" className="peer hidden" />

        <div className="peer-checked:flex hidden md:hidden flex-col bg-slate-950 border-b border-slate-800 px-4 py-4 space-y-4 text-slate-300">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search movies..."
              className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 px-4 text-sm"
            />
          </div>
          <NavLink to="/movies" className=" py-2 border-b border-slate-900">
            Movies
          </NavLink>
          <NavLink to="/shows" className=" py-2 border-b border-slate-900">
            TV Shows
          </NavLink>
          <NavLink to="/people" className=" py-2">
            People
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
