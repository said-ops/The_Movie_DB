import { create } from "zustand";
import { auth } from "../service/firesbase";
import { signInWithEmailAndPassword } from "firebase/auth";

const useAuthStore = create((set, get) => ({
  user: null,
  error: null,
  loading: null,
  email: "",
  password: "",
  setEmail: (email) => set({ email: email }),
  setPassword: (password) => set({ password: password }),

  //function for sign in with email and password

  signIn: async () => {
    const { email, password } = get();
    try {
      set({ loading: true, error: "" });
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      set({ user: userCredential.user, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  //function to sign out
  signOut: async () => {
    await auth.signOut();
    set({ user: null, email: "", password: "" });
  },
}));

export default useAuthStore;
