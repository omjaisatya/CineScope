import api from "./apiConfig";

const handleError = (label, error, fallback = []) => {
  console.error(`[movieService] ${label}:`, error?.message || error);
  return fallback;
};

export const getTrendingMovies = async (timeWindow = "day") => {
  try {
    const { data } = await api.get(`/trending/movie/${timeWindow}`);
    return data.results;
  } catch (e) {
    return handleError("getTrendingMovies", e);
  }
};

export const getTrendingShows = async (timeWindow = "day") => {
  try {
    const { data } = await api.get(`/trending/tv/${timeWindow}`);
    return data.results;
  } catch (e) {
    return handleError("getTrendingShows", e);
  }
};

export const getTrendingPeople = async (timeWindow = "day") => {
  try {
    const { data } = await api.get(`/trending/person/${timeWindow}`);
    return data.results;
  } catch (e) {
    return handleError("getTrendingPeople", e);
  }
};
