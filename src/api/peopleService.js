import api from "./apiConfig";

const handleError = (label, error, fallback = []) => {
  console.error(`[movieService] ${label}:`, error?.message || error);
  return fallback;
};

export const getTrendingPeople = async () => {
  try {
    const { data } = await api.get("/trending/person/day"); //Destructuring data
    return data.results;
  } catch (e) {
    return handleError("getTrendingPeople", e);
  }
};

export const getPopularPeople = async () => {
  try {
    const { data } = await api.get("/person/popular");
    return data.results;
  } catch (e) {
    return handleError("getPopularPeople", e);
  }
};

export const getPersonDetails = async (personId) => {
  try {
    const { data } = await api.get(`/person/${personId}`);
    return data;
  } catch (e) {
    return handleError("getPersonDetails", e, null);
  }
};

export const getPersonCredits = async (personId) => {
  try {
    const { data } = await api.get(`/person/${personId}/combined_credits`);
    return data;
  } catch (e) {
    return handleError("getPersonCredits", e, null);
  }
};

export const getPersonImages = async (personId) => {
  try {
    const { data } = await api.get(`/person/${personId}/images`);
    return data.profiles || [];
  } catch (e) {
    return handleError("getPersonImages", e);
  }
};
