import React, { useEffect, useState } from "react";
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
  const [formErrors,setErrors]=useState('')
  const navigate = useNavigate();


  useEffect(()=>{
    userCheck();
    if(user){
      navigate('/')
    }
  },[user])

  
  
  const handleSubmit = async (e) => {
    const errors={}
    let hasError =false
    e.preventDefault();

    if(!email){
      errors.errorEmail='This field is required'
      hasError=true
    }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      errors.errorEmail='Invalid Email Address'
      hasError=true
    }
    if(!password){
      errors.errorPass='This field is required'
      hasError=true
    }else if(password.length<8){
      errors.errorPass='Password must be 8 characters or more'
      hasError=true
    }
    setErrors(errors)
    if (!hasError) {
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
            {formErrors.errorEmail?<span className="error">{formErrors.errorEmail}</span>:''}
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {formErrors.errorPass?<span className="error">{formErrors.errorPass}</span>:''}
            
          </div>
          {errorLogin?<span className="error">{errorLogin}</span>:''}

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
