import { create } from "zustand"
import { db } from "../service/firesbase"
import { doc,getDoc,updateDoc ,setDoc} from "firebase/firestore"
import useAuthStore from "./authStore"


const useWatchListSotre = create((set,get)=>({

    watchList:[],
    error:null,
    loading:false,

    //function to fetch the watchlist from firestore

    fetchWatchlist : async () => {
        const { user } = useAuthStore.getState();
        if (!user) return;
        set({ loading: true, error: null }); // Typo: error was set to false, should be null for consistency
    
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
            set({ error: error.message, loading: false });
        }
    }
    ,

    //function to add a movie to the watchlist

    addToWatchList : async (id) => {
        const { watchList } = get();
        const { user } = useAuthStore.getState();
        if (!user) return;
    
        const userDoc = doc(db, 'users', user.uid);
    
        try {
            // Check if the document exists
            const docSnap = await getDoc(userDoc);
    
            if (docSnap.exists()) {
                // Document exists, update the watchlist
                const updatedWatchlist = [...watchList, id];
                await updateDoc(userDoc, { watchlist: updatedWatchlist });
                set({ watchList: updatedWatchlist });
            } else {
                // Document doesn't exist, create it with an initial watchlist
                const initialWatchlist = [id];
                await setDoc(userDoc, { watchlist: initialWatchlist });
                set({ watchlist: initialWatchlist });
            }
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    }
    ,

    //function to remove items from watch list 
    removeFromWatchlist: async (movieId) => {
        const { user } = useAuthStore.getState();
        const { watchList } = get();
    
        if (!user) return;
    
        const userDoc = doc(db, 'users', user.uid);
    
        try {
          const updatedWatchlist = watchList.filter((id) => id !== movieId);
          await updateDoc(userDoc, { watchlist: updatedWatchlist });
          set({ watchList: updatedWatchlist });
        } catch (error) {
          console.error('Error removing from watchlist:', error);
          set({ error: 'Failed to remove movie', loading: false });
        }
      }
    
}))

export default useWatchListSotre