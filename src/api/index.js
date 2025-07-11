import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

const fetchData = async (url, config = {}) => {
  const response = await axiosInstance.get(url, config);
  return response.data;
};

export const getImagePath = (path, width = 300) =>
  path ? `${IMAGE_BASE_URL}w${width}${path}` : "/assets/images/no-image.webp";

export const getTrendingMovies = () =>
  fetchData("/trending/movie/day?language=en-US");

export const getMovieDetails = (id) =>
  fetchData(`/movie/${id}?language=en-US`);

export const getMovieCast = (id) =>
  fetchData(`/movie/${id}/credits?language=en-US`);

export const getMovieReviews = (id) =>
  fetchData(`/movie/${id}/reviews?language=en-US`);

export const searchMovies = (query) =>
  fetchData(`/search/movie?query=${encodeURIComponent(query)}&language=en-US`);
