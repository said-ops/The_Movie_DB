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
            <img src="/images/bookmark.svg" alt="bookmark" />
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
            </div>
          </div>
          <div className="trailer"></div>
        </div>
      </section>
    </>
  );
}

export default MovieDetails;
