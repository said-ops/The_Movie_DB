import React from "react";
import NavBar from "./NavBar";

function SearchPage() {
  return (
    <>
      <section className="app-container">
        <NavBar />
        <form action="#">
        <div className="search-container">
          <div className="search">
            <label htmlFor="search">Search</label>
            <input
              type="text"
              name="search"
              id="search"
            />
            <button type="submit" className="search-btn">Search</button>
            <span className="error">this field is required</span>
          </div>
        </div>
        </form>
        <div className="home-container">
          <h1>Search Results For : <span className="search-term">Search Term</span></h1>
          <div className="cards">
            {/* movies cards goes here */}
            <div className="card">
              <img src="/images/movie-poster.jpg" alt="" />
              <div className="card-body">
                <p className="movie-title">Avengers holy moly</p>
                <p className="desc">
                  <span className="duration">1h45min</span>
                  <span className="genre">Action</span>
                </p>
              </div>
            </div>
            <div className="card">
              <img src="/images/movie-poster.jpg" alt="" />
              <div className="card-body">
                <p className="movie-title">Avengers holy moly</p>
                <p className="desc">
                  <span className="duration">1h45min</span>
                  <span className="genre">Action</span>
                </p>
              </div>
            </div>
            <div className="card">
              <img src="/images/movie-poster.jpg" alt="" />
              <div className="card-body">
                <p className="movie-title">Avengers holy moly</p>
                <p className="desc">
                  <span className="duration">1h45min</span>
                  <span className="genre">Action</span>
                </p>
              </div>
            </div>
            <div className="card">
              <img src="/images/movie-poster.jpg" alt="" />
              <div className="card-body">
                <p className="movie-title">Avengers holy moly</p>
                <p className="desc">
                  <span className="duration">1h45min</span>
                  <span className="genre">Action</span>
                </p>
              </div>
            </div>
            <div className="card">
              <img src="/images/movie-poster.jpg" alt="" />
              <div className="card-body">
                <p className="movie-title">Avengers holy moly</p>
                <p className="desc">
                  <span className="duration">1h45min</span>
                  <span className="genre">Action</span>
                </p>
              </div>
            </div>
            <div className="card">
              <img src="/images/movie-poster.jpg" alt="" />
              <div className="card-body">
                <p className="movie-title">Avengers holy moly</p>
                <p className="desc">
                  <span className="duration">1h45min</span>
                  <span className="genre">Action</span>
                </p>
              </div>
            </div>
            <div className="card">
              <img src="/images/movie-poster.jpg" alt="" />
              <div className="card-body">
                <p className="movie-title">Avengers holy moly</p>
                <p className="desc">
                  <span className="duration">1h45min</span>
                  <span className="genre">Action</span>
                </p>
              </div>
            </div>
            <div className="card">
              <img src="/images/movie-poster.jpg" alt="" />
              <div className="card-body">
                <p className="movie-title">Avengers holy moly</p>
                <p className="desc">
                  <span className="duration">1h45min</span>
                  <span className="genre">Action</span>
                </p>
              </div>
            </div>
            <div className="card">
              <img src="/images/movie-poster.jpg" alt="" />
              <div className="card-body">
                <p className="movie-title">Avengers holy moly</p>
                <p className="desc">
                  <span className="duration">1h45min</span>
                  <span className="genre">Action</span>
                </p>
              </div>
            </div>
            <div className="card">
              <img src="/images/movie-poster.jpg" alt="" />
              <div className="card-body">
                <p className="movie-title">Avengers holy moly</p>
                <p className="desc">
                  <span className="duration">1h45min</span>
                  <span className="genre">Action</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SearchPage;
