import React from 'react'
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <>
    <section className="sign-container">
      <form action="#">
        <h1>Sign Up</h1>
        <div className="inputs">
          <label htmlFor="email">Email Address</label>
          <input type="text" name="email" id="email" placeholder='example@domain.com' />
          <span className="error">this field is required</span>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" placeholder='Create password'/>
          <span className="error">this field is required</span>
          <label htmlFor="confirm-pass">Confirm Password</label>
          <input type="password" name="confirm-pass" id="confirm-pass" placeholder='Confirm password' />
          <span className="error">this field is required</span>
          
        </div>
        <button type="submit">Sign Up</button>
        <span className="option">Already have an account? , <Link to='/Sign-In'><span className="link">Login</span></Link></span>
      </form>
    </section>
  </>
  )
}

export default SignUp