import { create } from "zustand";

const apiKey = import.meta.env.VITE_API_KEY_AUTH;
const detailsUrl = "https://api.themoviedb.org/3/movie";

const useDetailsStore = create((set) => ({
  details: null,
  error: null,
  loading: false,

  //function to fetch movie details based on id

  fetchDetails: async (id) => {
    set({ loading: false, error: null });
    try {
      const response = await fetch(`${detailsUrl}/${id}?api_key=${apiKey}`);
      const data = await response.json();
      set({ details: data, loading: false });
      if (!response.ok) {
        throw new Error("Failed to fetch details");
      }
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },
}));

export default useDetailsStore;
