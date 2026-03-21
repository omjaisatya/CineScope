import { useState, useEffect } from "react";
import HomePage from "../components/HomePage";
import {
  getMoviesDiscover,
  getTopRatedMovies,
  getTrendingMovies,
} from "../api/movieService";
// import Loading from "../components/Loading";

function Home() {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [topRated, trending, movieDiscover] = await Promise.all([
          getTopRatedMovies(),
          getTrendingMovies(),
          getMoviesDiscover(),
        ]);

        setTopRatedMovies(topRated || []);
        setTrendingMovies(trending || []);

        if (movieDiscover && movieDiscover.length > 0) {
          const randomMovie =
            movieDiscover[Math.floor(Math.random() * movieDiscover.length)];
          setFeaturedMovie(randomMovie);
        }
      } catch (err) {
        console.error("Home fetch error:", err);
        setError("Failed to load movies. Please try again");
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  // if (loading) return <Loading message="Loading..." />;

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
    <>
      <HomePage
        featuredMovie={featuredMovie}
        trendingMovies={trendingMovies}
        topRatedMovies={topRatedMovies}
        loading={loading}
      />
    </>
  );
}

export default Home;
