import React from "react";
import NavBar from "./NavBar";

function MovieDetails() {
  return (
    <>
      <section className="app-container">
        <NavBar />
        <div className="title">
          <h1>The Gray Man</h1>
          <div className="bookmark">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30px"
              height="30px"
              viewBox="0 0 24 24"
              fill="var(--very-light-gray)"
            >
              <path
                d="M5 6.2C5 5.07989 5 4.51984 5.21799 4.09202C5.40973 3.71569 5.71569 3.40973 6.09202 3.21799C6.51984 3 7.07989 3 8.2 3H15.8C16.9201 3 17.4802 3 17.908 3.21799C18.2843 3.40973 18.5903 3.71569 18.782 4.09202C19 4.51984 19 5.07989 19 6.2V21L12 16L5 21V6.2Z"
                stroke="#000000"
                strokeWidth="2"
                strokeLinejoin="round"
                // style="&#10;"
              />
            </svg>
            <p>Bookmark</p>
          </div>
        </div>
        <div className="infos">
          <div className="details">
            <div className="poster">
              <img src="/images/movie-poster.jpg" alt="poster" />
            </div>
            <div className="text">
              <div className="genres">
                <span className="genr">Action</span>
                <span className="genr">Science-fi</span>
              </div>
              <p className="summary">
                A thief who steals corporate secrets through the use of
                dream-sharing technology is given the inverse task of planting
                an idea into the mind of a C.E.O., but his tragic past may doom
                the project and his team to disaster.
              </p>
              <div className="rates">
                <div className="rate">
                  <span className="rate-text">IMDB rating</span>
                  <span className="rate-metrics">
                    9.7/
                    <span className="base-rate">10</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="trailer">
            <iframe
              width="423px"
              height="319px"
              src="https://www.youtube.com/embed/BmllggGO4pM"
              title="Movie Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <h2>Cast</h2>
        <div className="casts">
          <div className="cast">
            <img src="/images/" alt="" />
          </div>
        </div>
      </section>
    </>
  );
}

export default MovieDetails;
