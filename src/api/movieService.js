import api from "./apiConfig";

export const getTrendingMovies = async () => {
  try {
    const respose = await api.get("/trending/movie/day");
    console.log("get trending movies", respose.data.results);
    const data = respose.data.results;
    return data;
  } catch (error) {
    console.log("Error fetching trending movies", error);
    return [];
  }
};

export const getMoviesDetails = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}`);
    console.log("fetching moviesdetails", response.data);

    const data = response.data;
    return data;
  } catch (error) {
    console.log("Error fetching movies details", error);
    return null;
  }
};

export const getMovieVideo = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}/videos`);
    console.log(response);
    const data = response.data;
    return data;
  } catch (error) {
    console.log("error while fetching video", error);
  }
};

export const getMoviesDiscover = async () => {
  try {
    const response = await api.get("/discover/movie");

    const data = response.data.results;
    console.log("Discover movies", data);
    return data;
  } catch (error) {
    console.log("Error fetching discover movies", error);
  }
};

export const getMoviesRecommendations = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}/recommendations`);
    console.log(response);
    const data = response.data.results;
    return data;
  } catch (error) {
    console.log("Error fetching movies recommentdation", error);
    return [];
  }
};

export const getTopRatedMovies = async () => {
  try {
    const response = await api.get("/movie/top_rated");
    const data = response.data.results;
    console.log("Api top rated movies", data);
    return data;
  } catch (error) {
    console.log("Error fetching top rated moives", error);
  }
};
