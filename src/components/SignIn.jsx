import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

function SignIn() {
  const email = useAuthStore((state) => state.email);
  const password = useAuthStore((state) => state.password);
  const setEmail = useAuthStore((state) => state.setEmail);
  const user = useAuthStore((state) => state.user);
  const error = useAuthStore((state) => state.error);
  const setPassword = useAuthStore((state) => state.setPassword);
  const signIn = useAuthStore((state) => state.signIn);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      await signIn();
      console.log(user);
      if (!error) {
        navigate("/");
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
          <button type="submit">Sign In</button>
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
