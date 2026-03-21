import { useState, useEffect } from "react";
import {
  getTrendingMovies,
  getTrendingShows,
  getTrendingPeople,
} from "../api/allTrendingService";
import MovieCard from "../components/MovieCard";
import ShowCard from "../components/ShowCard";
import PersonCard from "../components/PersonCard";

const TABS = [
  { key: "all", label: "All" },
  { key: "movies", label: "Movies" },
  { key: "shows", label: "TV Shows" },
  { key: "people", label: "People" },
];

const TIME_WINDOWS = [
  { key: "day", label: "Today" },
  { key: "week", label: "This Week" },
];

const CARDS_PER_PAGE = 18;

const SectionSkeleton = ({ count = 6 }) => (
  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="rounded-xl bg-slate-800 animate-pulse">
        <div className="aspect-2/3 rounded-t-xl bg-slate-700" />
        <div className="p-2.5 space-y-1.5">
          <div className="h-3 bg-slate-700 rounded w-3/4" />
          <div className="h-2.5 bg-slate-700 rounded w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

// individual ranked card with position number
const RankedCard = ({ item, rank }) => {
  const isMovie = item.media_type === "movie";
  const isShow = item.media_type === "tv";
  const isPerson = item.media_type === "person";

  return (
    <div className="relative">
      {/* Rank badge */}
      <div className="absolute -top-2 -left-2 z-10 w-7 h-7 rounded-full bg-cyan-500 flex items-center justify-center text-xs font-black text-white shadow-lg shadow-cyan-500/40">
        {rank}
      </div>
      {isMovie && <MovieCard movie={item} />}
      {isShow && <ShowCard show={item} />}
      {isPerson && <PersonCard person={item} />}
    </div>
  );
};

function Trending() {
  const [activeTab, setActiveTab] = useState("all");
  const [timeWindow, setTimeWindow] = useState("day");
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(CARDS_PER_PAGE);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        setError(null);
        setVisibleCount(CARDS_PER_PAGE);

        const [moviesData, showsData, peopleData] = await Promise.all([
          getTrendingMovies(timeWindow),
          getTrendingShows(timeWindow),
          getTrendingPeople(timeWindow),
        ]);

        setMovies(moviesData || []);
        setShows(showsData || []);
        setPeople(peopleData || []);
      } catch (err) {
        setError("Failed to load trending content.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [timeWindow]); // refetch when time window changes

  // merge + sort all by popularity for the "All" tab
  const allItems = [
    ...movies.map((m) => ({ ...m, media_type: "movie" })),
    ...shows.map((s) => ({ ...s, media_type: "tv" })),
    ...people.map((p) => ({ ...p, media_type: "person" })),
  ].sort((a, b) => (b.popularity || 0) - (a.popularity || 0));

  const tabItems = {
    all: allItems,
    movies: movies.map((m) => ({ ...m, media_type: "movie" })),
    shows: shows.map((s) => ({ ...s, media_type: "tv" })),
    people: people.map((p) => ({ ...p, media_type: "person" })),
  };

  const currentItems = tabItems[activeTab] || [];
  const visibleItems = currentItems.slice(0, visibleCount);
  const hasMore = visibleCount < currentItems.length;

  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-3">
        <p className="text-red-400">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 text-sm rounded-lg bg-cyan-700 hover:bg-cyan-600 text-white transition"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-16 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-white mb-1">
            🔥 Trending
          </h1>
          <p className="text-slate-400 text-sm">
            What everyone's watching right now
          </p>
        </div>

        {/* Controls — tabs + time window toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          {/* Type tabs */}
          <div className="flex gap-2 flex-wrap">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key);
                  setVisibleCount(CARDS_PER_PAGE);
                }}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition border ${
                  activeTab === tab.key
                    ? "bg-cyan-600 border-cyan-600 text-white"
                    : "border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white"
                }`}
              >
                {tab.label}
                {!loading && (
                  <span
                    className={`ml-1.5 text-xs ${activeTab === tab.key ? "text-cyan-200" : "text-slate-600"}`}
                  >
                    {tab.key === "all" && allItems.length}
                    {tab.key === "movies" && movies.length}
                    {tab.key === "shows" && shows.length}
                    {tab.key === "people" && people.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Today / This Week toggle */}
          <div className="flex rounded-xl overflow-hidden border border-slate-700 self-start sm:self-auto">
            {TIME_WINDOWS.map((w) => (
              <button
                key={w.key}
                onClick={() => setTimeWindow(w.key)}
                className={`px-4 py-1.5 text-sm font-medium transition ${
                  timeWindow === w.key
                    ? "bg-slate-700 text-white"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                {w.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <SectionSkeleton count={18} />
        ) : currentItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400">
            <p className="text-5xl mb-4">📭</p>
            <p>Nothing trending here right now.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {visibleItems.map((item, i) => (
                <RankedCard
                  key={`${item.media_type}-${item.id}`}
                  item={item}
                  rank={i + 1}
                />
              ))}
            </div>

            {hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setVisibleCount((c) => c + CARDS_PER_PAGE)}
                  className="px-8 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium border border-slate-700 transition"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Trending;
