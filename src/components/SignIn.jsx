import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

function SignIn() {
  const email = useAuthStore((state) => state.email);
  const password = useAuthStore((state) => state.password);
  const setEmail = useAuthStore((state) => state.setEmail);
  const user = useAuthStore((state) => state.user);
  const errorLogin  = useAuthStore((state) => state.errorLogin);
  const loading = useAuthStore((state) => state.loading);
  const setPassword = useAuthStore((state) => state.setPassword);
  const signIn = useAuthStore((state) => state.signIn);
  const userCheck = useAuthStore((state) => state.userCheck);
  const navigate = useNavigate();


  useEffect(()=>{
    userCheck();
    if(user){
      navigate('/')
    }
  },[user])

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      await signIn();
      const authError = await useAuthStore.getState().errorLogin;

      if(!authError){
        navigate('/')
      }
    }
  };
  return (
    <>
      <section className="sign-container">
        
        <form action="#" onSubmit={(e) => handleSubmit(e)}>
          <h1>Sign In</h1>
          <div className="inputs">
            <label htmlFor="email">Email Address</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="example@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="error">this field is required</span>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="error">this field is required</span>
          </div>
          {loading ?
            <div className="loader"></div>
            :
            <button type="submit">Sign In</button>  
        }
          <span className="option">
            You don’t have an account? ,{" "}
            <Link to="/Sign-Up">
              <span className="link">SignUp</span>
            </Link>
          </span>
        </form>
      </section>
    </>
  );
}

export default SignIn;
