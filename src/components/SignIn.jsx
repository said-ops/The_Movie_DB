import React from "react";

function SignIn() {
  return (
    <>
      <section className="sign-container">
        <form action="#">
          <h1>Sign In</h1>
          <div className="inputs">
            <label htmlFor="email">Email Address</label>
            <input type="text" name="email" id="email" />
            <span className="error">this field is required</span>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
            <span className="error">this field is required</span>
          </div>
          <button type="submit">Sign In</button>
          <span className="option">Already have an account? , <span className="link">Login</span></span>
        </form>
      </section>
    </>
  );
}

export default SignIn;
