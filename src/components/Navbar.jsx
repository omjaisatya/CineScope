import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { searchMulti } from "../api/movieService";
import { getImage } from "../utils/getImage";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // cclose dropdown on outside click — supports both mouse AND touch
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside); // 👈 fixes mobile
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (query.length > 2) {
        const data = await searchMulti(query);
        setResults(data.slice(0, 6));
        setOpen(true);
      } else {
        setOpen(false);
        setResults([]);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [query]);

  const handleResultClick = (item) => {
    if (item.media_type === "movie") navigate(`/movie/${item.id}`);
    else if (item.media_type === "tv") navigate(`/shows/${item.id}`);
    else if (item.media_type === "person") navigate(`/people/${item.id}`);
    else navigate(`/search?q=${query}`);
    setOpen(false);
    setQuery("");
    setMenuOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/search?q=${query}`);
      setOpen(false);
      setMenuOpen(false);
    }
  };

  const closeMenu = () => setMenuOpen(false);

  // reusable result item — used in both desktop and mobile
  const ResultItem = ({ item }) => (
    <div
      key={item.id}
      onClick={() => handleResultClick(item)}
      onTouchEnd={(e) => {
        e.preventDefault();
        handleResultClick(item);
      }}
      className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800 active:bg-slate-700 cursor-pointer transition"
    >
      <img
        src={
          item.poster_path || item.backdrop_path || item.profile_path
            ? getImage(
                item.poster_path ?? item.backdrop_path ?? item.profile_path,
              )
            : "/placeholder-poster.png"
        }
        className="w-10 h-14 object-cover rounded"
        alt={item.title || item.name}
      />
      <div className="text-sm">
        <p className="text-white font-medium line-clamp-1">
          {item.title || item.name}
        </p>
        <p className="text-slate-400 text-xs capitalize">
          {item.media_type === "tv" ? "TV Show" : item.media_type}
        </p>
      </div>
    </div>
  );

  return (
    <nav className="sticky top-0 z-50 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <NavLink
              to="/"
              onClick={closeMenu}
              className="text-2xl font-bold tracking-tighter text-cyan-400 uppercase"
              end
            >
              Cine<span className="text-white">Scope</span>
            </NavLink>

            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
              <NavLink
                to="/movies"
                className={({ isActive }) =>
                  isActive ? "text-cyan-400" : "hover:text-white transition"
                }
              >
                Movies
              </NavLink>
              <NavLink
                to="/shows"
                className={({ isActive }) =>
                  isActive ? "text-cyan-400" : "hover:text-white transition"
                }
              >
                TV Shows
              </NavLink>
              <NavLink
                to="/people"
                className={({ isActive }) =>
                  isActive ? "text-cyan-400" : "hover:text-white transition"
                }
              >
                People
              </NavLink>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* desktop search */}
            <div className="relative hidden lg:block" ref={dropdownRef}>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search movies, shows, people..."
                className="w-48 bg-slate-900 text-white text-xs rounded-full py-1.5 px-4 border border-slate-700 focus:w-64 focus:ring-1 focus:ring-cyan-500 transition-all outline-none"
              />

              {open && results.length > 0 && (
                <div className="absolute mt-3 w-72 bg-slate-950/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-2 space-y-1">
                  {results.map((item) => (
                    <ResultItem key={item.id} item={item} />
                  ))}
                </div>
              )}
            </div>

            {/* mobile menu button */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="cursor-pointer md:hidden p-2 text-slate-300 hover:text-white"
            >
              {menuOpen ? (
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
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
              )}
            </button>
          </div>
        </div>
      </div>

      {/* mobile menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col bg-slate-950 border-b border-slate-800 px-4 py-4 space-y-4 text-slate-300">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search movies, shows, people..."
              className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 px-4 text-sm text-white outline-none focus:ring-1 focus:ring-cyan-500"
            />

            {/* mobile results  */}
            {open && results.length > 0 && (
              <div className="mt-2 bg-slate-900 border border-slate-800 rounded-xl p-2 space-y-1">
                {results.map((item) => (
                  <ResultItem key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>

          <NavLink
            to="/movies"
            onClick={closeMenu}
            className="py-2 border-b border-slate-900"
          >
            Movies
          </NavLink>
          <NavLink
            to="/shows"
            onClick={closeMenu}
            className="py-2 border-b border-slate-900"
          >
            TV Shows
          </NavLink>
          <NavLink to="/people" onClick={closeMenu} className="py-2">
            People
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
