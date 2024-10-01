import { create } from "zustand"
import { db } from "../service/firesbase"
import { doc,getDoc,updateDoc } from "firebase/firestore"
import useAuthStore from "./authStore"

const user = useAuthStore(state=>state.user)
const useWatchListSotre = create(set=>({

    watchList:[],
    error:null,
    loading:false,

    //function to fetch the watchlist from firestore

    fetchWatchlist :async ()=>{
        if(!user) return;

        set({loading:true,error:false})

        try {
            //get the document ref
         const userDoc = doc(db, 'users', user.uid);
         const docSnap = await getDoc(userDoc);

         if(docSnap.exists()){
            const watchlist = docSnap.data().watchlist || [];
            set({ watchlist:watchlist, loading: false });
         }else{
            set({watchList:[],loading:false});
         }
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    //function to add a movie to the watchlist

    addToWatchList : async (id)=>{
        const { watchlist } = get();

        if(!user) return;

        const userDoc = doc(db, 'users', user.uid);

        try {
            const updatedWatchlist = [...watchlist, id];
            await updateDoc(userDoc, { watchlist: updatedWatchlist });
            set({ watchlist: updatedWatchlist });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    //function to remove items from watch list 
    removeFromWatchlist: async (movieId) => {
        const { user } = useAuthStore.getState();
        const { watchlist } = get();
    
        if (!user) return;
    
        const userDoc = doc(db, 'users', user.uid);
    
        try {
          const updatedWatchlist = watchlist.filter((id) => id !== movieId);
          await updateDoc(userDoc, { watchlist: updatedWatchlist });
          set({ watchlist: updatedWatchlist });
        } catch (error) {
          console.error('Error removing from watchlist:', error);
          set({ error: 'Failed to remove movie', loading: false });
        }
      }
    
}))

export default useWatchListSotre