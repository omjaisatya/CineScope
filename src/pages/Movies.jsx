import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { getTrendingMovies } from "../api/movieService";

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

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getTrendingMovies();
        setMovies(data || []);
      } catch (error) {
        // console.error("Movie fetch error:", error);
        setError("failed to load movies", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  // if (loading) return <Loading message="Loading..." fullScreen={true} />;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="bg-[#0f172a] grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {/* {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))} */}

      {loading
        ? Array.from({ length: 12 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))
        : movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
    </div>
  );
}

export default Movies;
