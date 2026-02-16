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

export const getMoviesDetails = async () => {
  try {
    const response = await api.get("/movie/movie_id");
    console.log(response);

    const data = response.data.results;
    return data;
  } catch (error) {
    console.log("Error fetching movies details", error);
    return [];
  }
};

export const getMoviesDiscover = async () => {
  try {
    const response = await api.get("/discover/movie");
    console.log("Discover movies", response);

    const data = response.data.results;
    return data;
  } catch (error) {
    console.log("Error fetching discover movies", error);
  }
};

export const getMoviesRecommendations = async () => {
  try {
    const response = await api.get("");
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
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error fetching top rated moives", error);
  }
};
