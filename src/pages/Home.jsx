import React, { useState, useEffect } from "react";
import HomePage from "../components/HomePage";
import {
  getMoviesDiscover,
  getTopRatedMovies,
  getTrendingMovies,
} from "../api/movieService";
import Loading from "../components/Loading";

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
      } catch (error) {
        // console.error("Home fetch error:", error);
        setError("Failed to load movies. Please try again", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  if (loading) return <Loading message="Loading..." />;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <>
      <HomePage
        featuredMovie={featuredMovie}
        trendingMovies={trendingMovies}
        topRatedMovies={topRatedMovies}
      />
    </>
  );
}

export default Home;
