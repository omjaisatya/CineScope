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

  useEffect(() => {
    const fetchTopRatesMovies = async () => {
      setLoading(true);
      const data = await getTopRatedMovies();
      console.log("top rated", data);

      setTopRatedMovies(data);
      setLoading(false);
    };
    fetchTopRatesMovies();
  }, []);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      setLoading(true);
      const data = await getTrendingMovies();
      setTrendingMovies(data);
      setLoading(false);
    };
    fetchTrendingMovies();
  }, []);

  useEffect(() => {
    const fetchFeaturedMovie = async () => {
      setLoading(true);
      const movies = await getMoviesDiscover();
      if (movies && movies.length > 0) {
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        setFeaturedMovie(randomMovie);
      }
      setLoading(false);
    };
    fetchFeaturedMovie();
  }, []);

  if (loading) return <Loading message="Loading data..." />;

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
