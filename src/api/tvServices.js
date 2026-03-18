import api from "./apiConfig";

const handleError = (label, error, fallback = []) => {
  console.error(`[movieService] ${label}:`, error?.message || error);
  return fallback;
};

export const getTrendingShows = async () => {
  try {
    const { data } = await api.get("/trending/tv/day");
    return data.results;
  } catch (e) {
    return handleError("getTrendingShows", e);
  }
};

export const getTopRatedShows = async () => {
  try {
    const { data } = await api.get("/tv/top_rated");
    return data.results;
  } catch (e) {
    return handleError("getTopRatedShows", e);
  }
};

export const getShowDetails = async (showId) => {
  try {
    const { data } = await api.get(`/tv/${showId}`);
    return data;
  } catch (e) {
    return handleError("getShowDetails", e, null);
  }
};

export const getShowVideos = async (showId) => {
  try {
    const { data } = await api.get(`/tv/${showId}/videos`);
    return data.results;
  } catch (e) {
    return handleError("getShowVideos", e);
  }
};
