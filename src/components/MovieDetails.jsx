import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMoviesDetails } from "../api/movieService";
import Loading from "./Loading";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const data = await getMoviesDetails(id);
        setMovie(data);
      } catch (error) {
        console.log("failed to load movie details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) {
    return <Loading message="Loading movie details" />;
  }

  if (!movie) {
    return <div className="text-white">Movie not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 md:p-16">
      <div className="flex flex-col md:flex-row gap-10">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          className="w-full md:w-80 rounded-2xl shadow-2xl"
          alt={movie.title}
        />
        <div>
          <h1 className="text-5xl font-bold text-cyan-400">{movie.title}</h1>
          <p className="text-gray-400 mt-2">
            {movie.release_date} • {movie.runtime} min
          </p>
          <p className="mt-6 text-lg leading-relaxed text-slate-300">
            {movie.overview}
          </p>
          <div className="mt-8">
            <span className="bg-yellow-500 text-black px-3 py-1 rounded font-bold">
              ★ {movie.vote_average?.toFixed(1)}
            </span>
          </div>

          <div className="mt-5">
            <span className="bg-green-500 text-black px-2 py-1 mr-1 rounded font-sans">
              {movie.status}
            </span>

            <span className="bg-green-500 text-black px-2 py-1 mr-1 rounded font-sans">
              Language:{" "}
              <span className="text-gray-700">{movie.original_language}</span>
            </span>

            <span className="bg-green-500 text-black px-2 py-1 mr-1 rounded font-sans">
              Popularity:{" "}
              <span className="text-gray-700">
                {Math.floor(movie.popularity)}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
