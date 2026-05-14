import axios from "axios";

const API_KEY = "865639de7d600d13a4fb9851894224ae";
const BASE_URL = "https://api.themoviedb.org/3";

export const getTrendingMovies = async () => {
  const res = await axios.get(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
  );
  return res.data.results;
};

export const getMovieDetails = async (id) => {
  const res = await axios.get(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
  );
  return res.data;
};

export const getMovieCredits = async (id) => {
  const res = await axios.get(
    `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`
  );
  return res.data;
};

export const getMovieVideos = async (id) => {
  const res = await axios.get(
    `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`
  );
  return res.data;
};

export const searchMovies = async (query) => {
  const res = await axios.get(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );

  return res.data.results;
};