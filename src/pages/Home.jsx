import React, { useState, useEffect } from "react";
import HomePage from "../components/HomePage";
import {
  getMoviesDiscover,
  getTopRatedMovies,
  getTrendingMovies,
} from "../api/movieService";

function Home() {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);

  useEffect(() => {
    const fetchTopRatesMovies = async () => {
      const data = await getTopRatedMovies();
      console.log("top rated", data);

      setTopRatedMovies(data);
    };
    fetchTopRatesMovies();
  }, []);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      const data = await getTrendingMovies();
      setTrendingMovies(data);
    };
    fetchTrendingMovies();
  }, []);

  useEffect(() => {
    const fetchFeaturedMovie = async () => {
      const movies = await getMoviesDiscover();
      if (movies && movies.length > 0) {
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        setFeaturedMovie(randomMovie);
      }
    };
    fetchFeaturedMovie();
  }, []);

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
