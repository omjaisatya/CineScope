import { useState, useEffect } from "react";
import { getTrendingPeople, getPopularPeople } from "../api/peopleService";
import PersonCard from "../components/PersonCard";

const CARDS_PER_PAGE = 12;

const SectionSkeleton = () => (
  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="rounded-xl bg-slate-800 animate-pulse p-3">
        <div className="aspect-square rounded-lg bg-slate-700 mb-2.5" />
        <div className="h-3 bg-slate-700 rounded w-3/4 mx-auto" />
        <div className="h-2.5 bg-slate-700 rounded w-1/2 mx-auto mt-1.5" />
      </div>
    ))}
  </div>
);

const PeopleSection = ({ title, people, page, onLoadMore, loading }) => {
  const sliced = people.slice(0, page * CARDS_PER_PAGE);
  const hasMore = sliced.length < people.length;

  return (
    <section>
      <h2 className="text-xl sm:text-2xl font-bold border-l-4 border-cyan-500 pl-4 mb-5">
        {title}
      </h2>
      {loading && sliced.length > 0 ? (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {sliced.map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
          </div>
          {hasMore && (
            <div className="flex justify-center mt-6">
              <button
                onClick={onLoadMore}
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
  );
};

function People() {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trendingPage, setTrendingPage] = useState(1);
  const [popularPage, setPopularPage] = useState(1);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        setLoading(true);
        const [trendingData, popularData] = await Promise.all([
          getTrendingPeople(),
          getPopularPeople(),
        ]);
        setTrending(trendingData || []);
        setPopular(popularData || []);
      } catch (err) {
        setError("Failed to load people. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPeople();
  }, []);

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
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-16 py-10 space-y-14">
        <PeopleSection
          title="Trending People"
          people={trending}
          page={trendingPage}
          onLoadMore={() => setTrendingPage((p) => p + 1)}
          loading={!loading}
        />
        <PeopleSection
          title="Popular People"
          people={popular}
          page={popularPage}
          onLoadMore={() => setPopularPage((p) => p + 1)}
          loading={!loading}
        />
      </div>
    </div>
  );
}

export default People;
