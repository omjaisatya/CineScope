import React, { useState, useEffect } from "react";
import HomePage from "../components/HomePage";
import { getTopRatedMovies } from "../api/movieService";

function Home() {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState([]);

  useEffect(() => {
    const fetchTopRatesMovies = async () => {
      const data = await getTopRatedMovies();
      console.log("top rated", data);

      setTopRatedMovies(data);
    };
    fetchTopRatesMovies();
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
