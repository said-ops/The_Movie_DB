import { create } from "zustand";

const apiKey = import.meta.env.VITE_API_KEY_AUTH;
const baseUrl = `https://api.themoviedb.org/3/movie/popular?`;

const usePopularStore = create((set) => ({
  movies: [],
  error: "",
  loading: false,
  currentPage: 1,
  maxPages: 5,

  //fetch popular movies
  fetchPopular: async (page) => {
    try {
      set({ loading: true, error: "" });
      const res = await fetch(`${baseUrl}api_key=${apiKey}&page=${page}`);
      const data = await res.json();
      set({ movies: data.results, loading: false });
      if (!res.ok) {
        throw new Error(`Failed to fetch popular movies: ${res.statusText}`);
      }
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },
  //set page for api request
  setPage: (page) => {
    set((state) => {
      if (page >= 1 && page <= state.maxPages) {
        state.fetchPopular(page); // Fetch movies for the new page
        return { currentPage: page };
      }
      return state;
    });
  },
}));

export default usePopularStore;
