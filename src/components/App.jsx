import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import HomePage from "./HomePage";
import SearchPage from "./SearchPage";
import Watchlist from "./Watchlist";
import MovieDetails from "./MovieDetails";
import ProtectedRoute from "../routes/ProtectedRoute";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <SearchPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/details/:id"
            element={
              <ProtectedRoute>
                <MovieDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/watchlist"
            element={
              <ProtectedRoute>
                <Watchlist />
              </ProtectedRoute>
            }
          />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          {/* <Route
            path="*"
            element={
              <>
                <div className="not-found">
                  <img
                    style={{ marginInline: "auto" }}
                    src="/images/not-found-404.webp"
                    alt=""
                  />
                </div>
              </>
            }
          ></Route> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
