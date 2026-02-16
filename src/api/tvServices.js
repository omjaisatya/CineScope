import api from "./apiConfig";

export const getTrendingTV = async () => {
  try {
    const respose = await api.get("/trending/tv/day");
    console.log("get trending tv", respose.data.results);
    const data = respose.data.results;
    return data;
  } catch (error) {
    console.log("Error fetching trending tv", error);
    return [];
  }
};
