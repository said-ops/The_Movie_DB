import { create } from "zustand"
import { db } from "../service/firesbase"
import { doc,getDoc,updateDoc ,setDoc} from "firebase/firestore"
import useAuthStore from "./authStore"


const useWatchListSotre = create((set,get)=>({

    watchList:[],
    errorW:null,
    loading:false,
    //function to check if id is in watchlist
    isInWatchlist: (movieId) => {
        const { watchList } = get();
        return watchList.includes(movieId);
    },

    //function to fetch the watchlist from firestore

    fetchWatchlist : async () => {
        const { user } = useAuthStore.getState();
        if (!user) return;
        set({ loading: true, errorW: null });
    
        try {
            const userDoc = doc(db, 'users', user.uid);
            const docSnap = await getDoc(userDoc);
    
            if (docSnap.exists()) {
                const watchlist = docSnap.data().watchlist || [];
                set({ watchList: watchlist, loading: false });
            } else {
                set({ watchList: [], loading: false });
            }
        } catch (error) {
            set({ errorW: error.message, loading: false });
        }
    }
    ,

    //function to add a movie to the watchlist

    addToWatchList : async (id) => {
        const { watchList } = get();
        const { user } = useAuthStore.getState();
        if (!user) return;
    
        const userDoc = doc(db, 'users', user.uid);
        set({loading:true,errorW:null})
        try {
            // Check if the document exists
            const docSnap = await getDoc(userDoc);
    
            if (docSnap.exists()) {
                // Document exists, update the watchlist
                const updatedWatchlist = [...watchList, id];
                await updateDoc(userDoc, { watchlist: updatedWatchlist });
                set({ watchList: updatedWatchlist,loading:false });
            } else {
                // Document doesn't exist, create it with an initial watchlist
                const initialWatchlist = [id];
                await setDoc(userDoc, { watchlist: initialWatchlist });
                set({ watchlist: initialWatchlist,loading:false });
            }
        } catch (error) {
            set({ errorW: error.message, loading: false });
        }
    }
    ,

    //function to remove items from watch list 
    removeFromWatchlist: async (movieId) => {
        const { user } = useAuthStore.getState();
        const { watchList } = get();
    
        if (!user) return;
    
        const userDoc = doc(db, 'users', user.uid);
        set({loading:true,errorW:null})
        try {
          const updatedWatchlist = watchList.filter((id) => id !== movieId);
          await updateDoc(userDoc, { watchlist: updatedWatchlist });
          set({ watchList: updatedWatchlist,loading:false });
        } catch (error) {
          console.error('Error removing from watchlist:', error);
          set({ error: 'Failed to remove movie', loading: false });
        }
      }
    
}))

export default useWatchListSotre