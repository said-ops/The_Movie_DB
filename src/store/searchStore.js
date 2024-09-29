import { create } from "zustand";

const apiKey = import.meta.env.VITE_API_KEY_AUTH;
// &query=${searchTerm}&page=${page}
const termUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&include_adult=false`;


const useSearchStore = create(set=>({
    movies:[],
    loading:false,
    error:'',
    currentPage:1,
    maxPages:1,
    searchTerm:'',

    setTerm : term=>{
        set({searchTerm:term})
    },

    //fetch movies by search term
    fetchByTerm :async (term,page)=>{
        try {
            set({loading:true,error:'',movies:[]})
            const res = await fetch(`${termUrl}&query=${term}&page=${page}`)
            const data = await res.json()
            set({loading:false,movies:data.results,maxPages:parseInt(data.total_pages)})
            if(!res.ok){
                throw new Error(`Failed to fetch ${res.statusText}`);
            }
        } catch (error) {
            set({loading:false,error:error.message})
        }
    },
    //set the page
    setPage: (page) => {
        set((state) => {
          if (page >= 1 && page <= state.maxPages) {
            set({ movies: [], loading: true })
            state.fetchByTerm(state.searchTerm,page);
            return { currentPage: page};
          }
          return state;
        });
      }

}))

export default useSearchStore