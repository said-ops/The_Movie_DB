import { create } from "zustand";

const apiKey = import.meta.env.VITE_API_KEY_AUTH;
const detailsUrl = "https://api.themoviedb.org/3/movie";
// const trailerUrl =`${detailsUrl}/${id}/videos?api_key=${apiKey}`

const useDetailsStore = create((set) => ({
  details: null,
  error: null,
  loading: false,
  trailer:null,
  trailerLoading:false,
  trailerError:null,
  casts:null,
  castsLoading:false,
  castsError:null,

  //function to fetch movie details based on id

  fetchDetails: async (id) => {
    set({ loading: true, error: null });
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

  //function to fetch trailer

  fetchTrailer :async (id)=>{
    set({trailerLoading:true,trailerError:false})
    try {
        const response = await fetch(`${detailsUrl}/${id}/videos?api_key=${apiKey}`);
        const data = await response.json();
        
        const trailer = data.results.find(
            (video) => video.site === 'YouTube' && video.type === 'Trailer'
          );
          if (trailer) {
            set({ trailer: `https://www.youtube.com/embed/${trailer.key}` });
          } else {
            set({ trailer: null });
          }
          set({trailerLoading:false})
        if(!response.ok){
            throw new Error("Failed to fetch trailers");
        }
    } catch (error) {
        set({trailerError:error.message,loading:false})
    }
  },

  //function to fetch the casts

  fetchCasts : async (id)=>{
    set({castsLoading:true,castsError:null});
    try {
        const response = await fetch(`${detailsUrl}/${id}/credits?api_key=${apiKey}`);
        const data = await response.json();

        set({casts:data.cast.slice(0,8),castsLoading:false});
        if(!response.ok){
            throw new Error("Failed to fetch trailers");
        }
    } catch (error) {
        set({castsError:error.message,castsLoading:false})
    }
  }
}));

export default useDetailsStore;
