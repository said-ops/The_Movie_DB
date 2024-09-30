import React,{useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

function SignUp() {

  const email = useAuthStore((state) => state.email);
  const password = useAuthStore((state) => state.password);
  const confirmPass = useAuthStore((state) => state.confirmPass);
  const setEmail = useAuthStore((state) => state.setEmail);
  const setPassword = useAuthStore((state) => state.setPassword);
  const setConfirmPass = useAuthStore((state) => state.setConfirmPass);
  const errorLogin  = useAuthStore((state) => state.errorLogin);
  const loading = useAuthStore((state) => state.loading);
  const signUp = useAuthStore((state) => state.signUp);
  const [formErrors,setErrors]=useState('');
  const navigate = useNavigate();

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
    if(!confirmPass){
      errors.errorConfirmPass='This field is required'
      hasError=true
    }else if(confirmPass.length<8){
      errors.errorConfirmPass='Password must be 8 characters or more'
      hasError=true
    }else
    if(confirmPass!==password){
      errors.errorConfirmPass='Please Confirm you password'
      hasError=true
    }
    setErrors(errors)
    if (!hasError) {
      await signUp();
      const authError = await useAuthStore.getState().errorLogin;
      if(!authError){
        navigate('/')
        setEmail(''),
        setPassword('')
        setConfirmPass('')
      }
    }
  };
  return (
    <>
      <section className="sign-container">
        <form action="#" onSubmit={e=>handleSubmit(e)}>
          <h1>Sign Up</h1>
          <div className="inputs">
            <label htmlFor="email">Email Address</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="example@domain.com"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            {formErrors.errorEmail?<span className="error">{formErrors.errorEmail}</span>:''}
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Create password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            {formErrors.errorPass?<span className="error">{formErrors.errorPass}</span>:''}
            <label htmlFor="confirm-pass">Confirm Password</label>
            <input
              type="password"
              name="confirm-pass"
              id="confirm-pass"
              placeholder="Confirm password"
              value={confirmPass}
              onChange={(e)=>setConfirmPass(e.target.value)}
            />
            {formErrors.errorConfirmPass?<span className="error">{formErrors.errorConfirmPass}</span>:''}
          </div>
          {/* sign up error */}
          {errorLogin?<span className="error">{errorLogin}</span>:''}
          {/* show loader and hide button on submti */}
          {loading ?
            <div className="loader"></div>
            :
            <button type="submit">Sign Up</button>
        }
          <span className="option">
            Already have an account? ,{" "}
            <Link to="/Sign-In">
              <span className="link">Login</span>
            </Link>
          </span>
        </form>
      </section>
    </>
  );
}

export default SignUp;
