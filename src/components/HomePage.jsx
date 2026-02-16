import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

const HomePage = ({ featuredMovie, trendingMovies, topRatedMovies }) => {
  const backdropBaseUrl = "https://image.tmdb.org/t/p/original";

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* 1. hero section */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={`${backdropBaseUrl}${featuredMovie?.backdrop_path}`}
            alt="Featured Movie"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/60 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 flex h-full flex-col justify-center px-6 md:px-16 lg:w-1/2">
          <h1 className="text-4xl font-black md:text-6xl text-cyan-400 drop-shadow-lg">
            {featuredMovie?.title}
          </h1>
          <p className="mt-4 line-clamp-3 text-lg text-slate-300">
            {featuredMovie?.overview}
          </p>
          <div className="mt-8 flex gap-4">
            <button className="rounded-full bg-cyan-500 px-8 py-3 font-bold text-white transition hover:bg-cyan-400">
              Watch Trailer
            </button>
            <button className="rounded-full bg-slate-800/80 px-8 py-3 font-bold text-white backdrop-blur-md transition hover:bg-slate-700">
              More Info
            </button>
          </div>
        </div>
      </section>

      {/* 3. movie sections */}
      <main className="space-y-12 px-6 py-12 md:px-16">
        {/* Trending section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold tracking-tight border-l-4 border-cyan-500 pl-4">
              Trending Now
            </h2>
            <Link
              to="/trending"
              className="text-sm text-cyan-400 hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {trendingMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        {/* Top rated section */}
        <section>
          <h2 className="mb-6 text-2xl font-bold tracking-tight border-l-4 border-cyan-500 pl-4">
            Top Rated of All Time
          </h2>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {topRatedMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
