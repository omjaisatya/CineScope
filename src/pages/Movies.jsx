import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { getTrendingMovies } from "../api/movieService";
import Loading from "../components/Loading";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const data = await getTrendingMovies();
      setMovies(data);
      setLoading(false);
    };
    fetchMovies();
  }, []);

  if (loading) return <Loading message="Loading..." />;

  return (
    <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default Movies;
