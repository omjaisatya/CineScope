import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getMoviesDetails } from "../api/movieService";
import Loading from "./Loading";
import { getImage } from "../utils/getImage";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getMoviesDetails(id);
        if (!data) throw new Error("No data returned");
        setMovie(data);
      } catch (err) {
        setError("Failed to load movie details. Please try again.");
        console.error("MovieDetails fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <Loading message="Loading movie details..." />;

  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-3">
        <p className="text-red-400">{error}</p>
        <Link to="/" className="text-sm text-cyan-400 hover:underline">
          ← Back to Home
        </Link>
      </div>
    );

  if (!movie)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-3">
        <p className="text-slate-400">Movie not found.</p>
        <Link to="/" className="text-sm text-cyan-400 hover:underline">
          ← Back to Home
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <div className="relative h-48 sm:h-64 md:h-80 w-full overflow-hidden">
        <img
          src={getImage(movie.backdrop_path, "w500")}
          alt={movie.title}
          fetchPriority="high"
          loading="eager"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 py-8 -mt-20 relative z-10">
        <div className="flex flex-col sm:flex-row gap-6 md:gap-10">
          <div className="w-36 sm:w-48 md:w-64 shrink-0 mx-auto sm:mx-0">
            <img
              src={getImage(movie.poster_path, "w342")}
              className="w-full rounded-2xl shadow-2xl shadow-black/50"
              alt={movie.title}
              fetchPriority="high"
              loading="eager"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
              {movie.title}
            </h1>

            {movie.tagline && (
              <p className="mt-1 text-sm text-slate-400 italic">
                "{movie.tagline}"
              </p>
            )}

            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-400">
              <span>{movie.release_date?.slice(0, 4) || "N/A"}</span>
              <span className="text-slate-600">•</span>
              <span>{movie.runtime || "N/A"} min</span>
              <span className="text-slate-600">•</span>
              <span className="uppercase">
                {movie.original_language || "N/A"}
              </span>
              <span className="bg-yellow-500 text-black px-2 py-0.5 rounded font-bold text-xs ml-1">
                ★ {movie.vote_average?.toFixed(1) || "NA"}
              </span>
            </div>

            {movie.genres?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {movie.genres.map((g) => (
                  <span
                    key={g.id}
                    className="text-xs px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            )}

            <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-300">
              {movie.overview}
            </p>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: "Status", value: movie.status },
                {
                  label: "Popularity",
                  value: movie.popularity
                    ? Math.floor(movie.popularity)
                    : "N/A",
                },
                {
                  label: "Budget",
                  value: movie.budget
                    ? `$${(movie.budget / 1_000_000).toFixed(1)}M`
                    : "N/A",
                },
                {
                  label: "Revenue",
                  value: movie.revenue
                    ? `$${(movie.revenue / 1_000_000).toFixed(1)}M`
                    : "N/A",
                },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/50"
                >
                  <p className="text-xs text-slate-500 mb-0.5">{label}</p>
                  <p className="text-sm font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-3 flex-wrap">
              <Link
                to={`/movie/${movie.id}/videos`}
                className="rounded-full bg-cyan-600 hover:bg-cyan-500 px-6 py-2.5 text-sm font-bold text-white transition"
              >
                Watch Trailer
              </Link>
              <Link
                to="/"
                className="rounded-full bg-slate-800 hover:bg-slate-700 px-6 py-2.5 text-sm font-bold text-white transition border border-slate-600"
              >
                ← Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
