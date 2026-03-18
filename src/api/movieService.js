import api from "./apiConfig";

const handleError = (label, error, fallback = []) => {
  console.error(`[movieService] ${label}:`, error?.message || error);
  return fallback;
};

export const getTrendingMovies = async () => {
  try {
    const respose = await api.get("/trending/movie/day");
    const data = respose.data.results;
    return data;
  } catch (error) {
    return handleError("getTrendingMovies", error);
  }
};

export const getMoviesDetails = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}`);

    const data = response.data;
    return data;
  } catch (error) {
    return handleError("getMoviesDetails", error, null);
  }
};

export const getMovieVideo = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}/videos`);
    const data = response.data;
    return data;
  } catch (error) {
    return handleError("getMovieVideo", error, null);
  }
};

export const getMoviesDiscover = async () => {
  try {
    const response = await api.get("/discover/movie");

    const data = response.data.results;
    // console.log("Discover movies", data);
    return data;
  } catch (error) {
    return handleError("getMoviesDiscover", error);
  }
};

export const getMoviesRecommendations = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}/recommendations`);
    console.log(response);
    const data = response.data.results;
    return data;
  } catch (error) {
    return handleError("getMoviesRecommendations", error);
  }
};

export const getTopRatedMovies = async () => {
  try {
    const response = await api.get("/movie/top_rated");
    const data = response.data.results;
    return data;
  } catch (error) {
    return handleError("getTopRatedMovies", error);
  }
};

// search api
export const searchMulti = async (query) => {
  try {
    const response = await api.get(`/search/multi?query=${query}`);
    const data = await response.data;
    return data.results;
  } catch (error) {
    return handleError("searchMulti", error);
  }
};
