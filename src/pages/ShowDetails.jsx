import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getShowDetails } from "../api/tvServices";
import Loading from "../components/Loading";
import { getImage } from "../utils/getImage";

function ShowDetails() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShow = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getShowDetails(id);
        if (!data) throw new Error("No data");
        setShow(data);
      } catch (err) {
        setError("Failed to load show details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchShow();
  }, [id]);

  if (loading) return <Loading message="Loading show details..." />;
  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-3">
        <p className="text-red-400">{error}</p>
        <Link to="/shows" className="text-sm text-cyan-400 hover:underline">
          ← Back to Shows
        </Link>
      </div>
    );
  if (!show)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-3">
        <p className="text-slate-400">Show not found.</p>
        <Link to="/shows" className="text-sm text-cyan-400 hover:underline">
          ← Back to Shows
        </Link>
      </div>
    );

  const backdropUrl = show.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${show.backdrop_path}`
    : null;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* Backdrop */}
      {backdropUrl && (
        <div className="relative h-48 sm:h-64 md:h-80 w-full overflow-hidden">
          <img
            src={backdropUrl}
            alt={show.name}
            fetchPriority="high"
            loading="eager"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent" />
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 py-8 -mt-20 relative z-10">
        <div className="flex flex-col sm:flex-row gap-6 md:gap-10">
          {/* Poster */}
          <div className="w-36 sm:w-48 md:w-64 shrink-0 mx-auto sm:mx-0">
            <img
              src={getImage(show.poster_path, "w342")}
              className="w-full rounded-2xl shadow-2xl shadow-black/50"
              alt={show.name}
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
              {show.name}
            </h1>

            {show.tagline && (
              <p className="mt-1 text-sm text-slate-400 italic">
                "{show.tagline}"
              </p>
            )}

            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-400">
              <span>{show.first_air_date?.slice(0, 4)}</span>
              <span className="text-slate-600">•</span>
              <span>
                {show.number_of_seasons} Season
                {show.number_of_seasons !== 1 ? "s" : ""}
              </span>
              <span className="text-slate-600">•</span>
              <span>{show.number_of_episodes} Episodes</span>
              <span className="bg-yellow-500 text-black px-2 py-0.5 rounded font-bold text-xs ml-1">
                ★ {show.vote_average?.toFixed(1)}
              </span>
            </div>

            {/* Genres */}
            {show.genres?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {show.genres.map((g) => (
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
              {show.overview}
            </p>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: "Status", value: show.status },
                { label: "Type", value: show.type || "N/A" },
                {
                  label: "Language",
                  value: show.original_language?.toUpperCase(),
                },
                { label: "Popularity", value: Math.floor(show.popularity) },
                { label: "First Aired", value: show.first_air_date || "N/A" },
                { label: "Last Aired", value: show.last_air_date || "N/A" },
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

            {/* Networks */}
            {show.networks?.length > 0 && (
              <div className="mt-5">
                <p className="text-xs text-slate-500 mb-2 uppercase tracking-wider">
                  Networks
                </p>
                <div className="flex flex-wrap gap-2">
                  {show.networks.map((n) => (
                    <span
                      key={n.id}
                      className="text-xs px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300"
                    >
                      {n.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6">
              <Link
                to="/shows"
                className="rounded-full bg-slate-800 hover:bg-slate-700 px-6 py-2.5 text-sm font-bold text-white transition border border-slate-600 inline-block"
              >
                ← Back to Shows
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowDetails;
