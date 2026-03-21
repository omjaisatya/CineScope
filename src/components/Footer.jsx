import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white">
      <div className="max-w-7xl mx-auto px-6  grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">
            <span className="text-cyan-400">CINE</span>SCOPE
          </h2>
          <p className="text-sm">
            Discover movies, TV shows, and people from around the world.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Explore</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="hover:text-white transition"
                rel="preload"
              >
                Home
              </Link>
            </li>
            <li>
              <Link to="/movies" className="hover:text-white transition">
                Movies
              </Link>
            </li>
            <li>
              <Link to="/shows" className="hover:text-white transition">
                TV Shows
              </Link>
            </li>
            <li>
              <Link to="/people" className="hover:text-white transition">
                People
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Data Source</h3>
          <p className="text-sm mb-4">
            This product uses the TMDB API but is not endorsed or certified by
            TMDB.
          </p>
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <img
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
              alt="TMDB Logo"
              className="w-20"
            />
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} CineScope. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
