import { create } from "zustand";
import { auth } from "../service/firesbase";
import { signInWithEmailAndPassword,onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";


const useAuthStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem('user') || null),
  errorLogin: null,
  loading: null,
  email: "",
  password: "",
  confirmPass:'',
  setEmail: (email) => set({ email: email }),
  setPassword: (password) => set({ password: password }),
  setConfirmPass: (password) => set({ confirmPass: password }),

  //function for sign in with email and password

  signIn: async () => {
    const { email, password } = get();
    try {
      set({ loading: true, errorLogin: "" });
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // localStorage.setItem('user',JSON.stringify(userCredential.user));
      set({ user: userCredential.user, loading: false });
      

    } catch (error) {
       set({ errorLogin: error.message, loading: false });
    }
  },

  //function for sign up with email and password

  signUp :async ()=>{
    const {email,password} = get()
    try {
      set({loading:true,errorLogin:''})
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      set({user:user,loading:false});
      if(!user){
        throw new Error("Error Signing Up");
      }
    } catch (error) {
      set({loading:false,errorLogin:error.message})
    }
  },

  //function to sign out
  signOut: async () => {
    await auth.signOut();
    localStorage.removeItem('user')
    set({ user: null, email: "", password: "" });
  },

  //function to check if the user is authenticated on reload

  userCheck : ()=>{
    onAuthStateChanged(auth, (user)=>{
      if(user){
        localStorage.setItem('user', JSON.stringify(user));
        set({user:user})
      }
      else{
        localStorage.removeItem('user');
        set({user:null})
      }
    });
  }
}));

export default useAuthStore;
