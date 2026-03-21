import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
// import Loading from "./Loading";

const Skeleton = ({ className = "" }) => (
  <div
    className={`animate-pulse bg-linear-to-r from-slate-700 via-slate-600 to-slate-700 rounded-lg ${className}`}
  />
);

const MovieCardSkeleton = () => {
  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-slate-900">
      {/* this is for poster */}
      <div className="aspect-2/3 w-full overflow-hidden bg-slate-700 animate-pulse" />

      {/* this is for bottom info */}
      <div className="p-3 space-y-2">
        <div className="h-3.5 w-3/4 rounded bg-slate-700 animate-pulse" />
        <div className="h-3 w-1/3 rounded bg-slate-700 animate-pulse" />
      </div>
    </div>
  );
};

const HomePage = ({
  featuredMovie,
  trendingMovies,
  topRatedMovies,
  loading,
}) => {
  // const backdropBaseUrl = "https://image.tmdb.org/t/p/original"; //comment this for porformance they load more times
  const backdropBaseUrl = "https://image.tmdb.org/t/p/w780";

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* 1. hero section */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        {!loading && featuredMovie ? (
          <>
            <div className="absolute inset-0">
              <img
                // testing porformance
                fetchPriority="high"
                loading="eager"
                decoding="sync"
                // end
                src={`${backdropBaseUrl}${featuredMovie.backdrop_path}`}
                alt={featuredMovie.title}
                height={439}
                width={780}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/60 to-transparent" />
              <div className="absolute inset-0 bg-linear-to-t from-[#0f172a] via-transparent to-transparent" />
            </div>

            <div className="relative z-10 flex h-full flex-col justify-center px-6 md:px-16 lg:w-1/2">
              <h1 className="text-4xl font-black md:text-6xl text-cyan-900 drop-shadow-lg">
                {featuredMovie.title}
              </h1>
              <p className="mt-4 line-clamp-3 text-lg text-white drop-shadow-md">
                {featuredMovie.overview}
              </p>

              <div className="mt-8 flex gap-4">
                <Link
                  to={`/movie/${featuredMovie.id}/videos`}
                  className="rounded-full bg-cyan-900 px-8 py-3 font-bold text-white transition hover:bg-cyan-700 shadow-lg shadow-cyan-700/30"
                >
                  Watch Trailer
                </Link>

                <Link
                  to={`/movie/${featuredMovie.id}`}
                  className="rounded-full bg-slate-800/80 px-8 py-3 font-bold text-white backdrop-blur-md transition hover:bg-slate-700 border border-slate-600"
                >
                  More Info
                </Link>
              </div>
            </div>
          </>
        ) : (
          // <Loading message="Loading Featured Movies..." />
          <div className="absolute inset-0">
            <Skeleton className="h-full w-full" />
            <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 lg:w-1/2 space-y-4 z-10">
              <Skeleton className="h-16 w-3/4" />
              <Skeleton className="h-24 w-full" />
              <div className="flex gap-4 pt-4">
                <Skeleton className="h-12 w-40 rounded-full" />
                <Skeleton className="h-12 w-40 rounded-full" />
              </div>
            </div>
          </div>
        )}
      </section>

      {/*  movie sections */}
      <main className="space-y-12 px-6 py-12 md:px-16">
        {/* Trending section */}
        <section>
          {!loading && trendingMovies ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold tracking-tight border-l-4 border-cyan-500 pl-4">
                  Trending Now
                </h2>
                <Link
                  to="/trending"
                  aria-label="View all trending movies"
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
            </>
          ) : (
            // <Loading message="Loading trending Movies..." />

            // add skeleton
            <div className="">
              <h2 className="text-2xl font-bold tracking-tight border-l-4 border-cyan-500 pl-4">
                Trending Now
              </h2>

              <div className="bg-[#0f172a] grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {Array.from({ length: 12 }).map((_, i) => (
                  <MovieCardSkeleton key={i} />
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Top rated section */}
        <section>
          {!loading && topRatedMovies ? (
            <>
              <h2 className="mbb-6 text-2xl font-bold tracking-tight border-l-4 border-cyan-500 pl-4">
                Top Rated of All Time
              </h2>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {topRatedMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </>
          ) : (
            // <Loading message="Loading Movies..." />

            //add skeleton
            <div className="">
              <h2 className="text-2xl font-bold tracking-tight border-l-4 border-cyan-500 pl-4">
                Top Rated of All Time
              </h2>

              <div className="bg-[#0f172a] grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {Array.from({ length: 12 }).map((_, i) => (
                  <MovieCardSkeleton key={i} />
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default HomePage;
