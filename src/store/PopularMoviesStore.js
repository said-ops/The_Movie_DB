import { create } from "zustand";

const apiKey = import.meta.env.VITE_API_KEY_AUTH
const baseUrl =`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`

const usePopularStore = create (set=>({
    movies:[],
    error:'',
    loading:false,

    //fetch popular movies 
    fetchPopular : async ()=>{
        try {
            set({loading:true,error:''})
            const res = await fetch(baseUrl)
            const data = await res.json()
            set({movies:data.results,loading:false})
            if (!res.ok) {
                throw new Error(`Failed to fetch popular movies: ${res.statusText}`);
              }
        } catch (error) {
            set({loading:false,error:error.message})
        }
    }
}))

export default usePopularStore