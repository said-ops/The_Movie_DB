import { create } from "zustand";

const apiKey = import.meta.env.VITE_API_KEY_AUTH;
// &query=${searchTerm}&page=${page}
const termUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false`;
const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&include_adult=false`;
const discoverUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false`;


const useSearchStore = create((set,get) => ({
  movies: [],
  loading: false,
  error: "",
  currentPage: 1,
  maxPages: 1,
  searchTerm: "",
  genre: "",
  setGenre: (text) => set({ genre: text }),
  sortBy: "",
  setSortBy: (text) => set({ sortBy: text }),
  query:'',
  setQuery:text=>set({query:text}),

  setTerm: (term) => {
    set({ searchTerm: term });
  },

  //fetch movies by search term
  fetchByTerm: async (term, page) => {

    //build the url based on the params
    const{sortBy,genre}=get()
    let sortParam = "";
    let fullUrl = "";

    if (sortBy === "year") {
      sortParam = "&sort_by=release_date.desc";
    } else if (sortBy === "rating") {
      sortParam = "&sort_by=vote_average.desc";
    }

    const genreFilter = genre ? `&with_genres=${genre}` : "";

    if (term) {
        // If there is a search term, use the search/movie API
        fullUrl = `${searchUrl}&query=${term}&page=${page}`;
      } else {
        // If no search term, use the discover/movie API for filtering
        fullUrl = `${discoverUrl}&page=${page}${sortParam}${genreFilter}`;
      }

    try {
      set({ loading: true, error: "", movies: [] });
      const res = await fetch(`${fullUrl}`);
      const data = await res.json();
      set({
        loading: false,
        movies: data.results,
        maxPages: parseInt(data.total_pages),
      });
      if (!res.ok) {
        throw new Error(`Failed to fetch ${res.statusText}`);
      }
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },
  //set the page
  setPage: (page) => {
    set((state) => {
      if (page >= 1 && page <= state.maxPages) {
        set({ movies: [], loading: true });
        state.fetchByTerm(state.searchTerm, page);
        return { currentPage: page };
      }
      return state;
    });
  },
}));

export default useSearchStore;
