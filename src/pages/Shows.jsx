import { useState, useEffect } from "react";
import { getTrendingShows, getTopRatedShows } from "../api/tvServices";
import ShowCard from "../components/ShowCard";

const CARDS_PER_PAGE = 12;

const SectionSkeleton = () => (
  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
    {Array.from({ length: 6 }).map((_, i) => (
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

function Shows() {
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trendingPage, setTrendingPage] = useState(1);
  const [topRatedPage, setTopRatedPage] = useState(1);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        setLoading(true);
        const [trendingData, topRatedData] = await Promise.all([
          getTrendingShows(),
          getTopRatedShows(),
        ]);
        setTrending(trendingData || []);
        setTopRated(topRatedData || []);
      } catch (err) {
        setError("Failed to load shows. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchShows();
  }, []);

  // if (loading) return <Loading message="Loading shows..." />;
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

  const trendingSlice = trending.slice(0, trendingPage * CARDS_PER_PAGE);
  const topRatedSlice = topRated.slice(0, topRatedPage * CARDS_PER_PAGE);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-16 py-10 space-y-14">
        {/* Trending */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold border-l-4 border-cyan-500 pl-4 mb-5">
            Trending Shows
          </h2>
          {!loading && trendingSlice.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {trendingSlice.map((show) => (
                  <ShowCard key={show.id} show={show} />
                ))}
              </div>
              {trendingSlice.length < trending.length && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => setTrendingPage((p) => p + 1)}
                    className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium border border-slate-700 transition"
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          ) : (
            <SectionSkeleton />
          )}
        </section>

        {/* Top Rated */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold border-l-4 border-cyan-500 pl-4 mb-5">
            Top Rated Shows
          </h2>
          {!loading && topRatedSlice.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {topRatedSlice.map((show) => (
                  <ShowCard key={show.id} show={show} />
                ))}
              </div>
              {topRatedSlice.length < topRated.length && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => setTopRatedPage((p) => p + 1)}
                    className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium border border-slate-700 transition"
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          ) : (
            <SectionSkeleton />
          )}
        </section>
      </div>
    </div>
  );
}

export default Shows;
