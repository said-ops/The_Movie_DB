import React from "react";

function SignIn() {
  return (
    <>
      <section className="sign-contaienr">
        <form action="#">
          <h1>Sign In</h1>
          <div className="inputs">
            <label htmlFor="email">Email Address</label>
            <input type="text" name="email" id="email" />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
          </div>
          <button type="submit">Sign In</button>
        </form>
      </section>
    </>
  );
}

export default SignIn;
