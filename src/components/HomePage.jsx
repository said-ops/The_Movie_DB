import React, { useEffect } from "react";
import NavBar from "./NavBar";
import usePopularStore from "../store/PopularMoviesStore";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";

function HomePage() {
  const movies = usePopularStore((state) => state.movies);
  const error = usePopularStore((state) => state.error);
  const loading = usePopularStore((state) => state.loading);
  const fetchPopular = usePopularStore((state) => state.fetchPopular);
  const currentPage = usePopularStore((state) => state.currentPage);
  const setPage = usePopularStore((state) => state.setPage);

  useEffect(() => {
    fetchPopular(currentPage);
  }, [currentPage]);
  return (
    <>
      <>
        <section className="app-container">
          <NavBar />
          <div className="home-container">
            <h1>Popular Movies</h1>
            <div className="cards">
              {/* movies cards goes here */}
              {movies.length > 0 &&
                movies.map((movie, index) => {
                  return (
                    <Link to={`/details/${parseInt(movie.id)}`} key={index}>
                      <div className="card" key={index}>
                        <img
                          src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                          alt=""
                        />
                        <div className="card-body">
                          <p className="movie-title">
                            {movie.title.split(" ").slice(0, 3).join(" ") +
                              "..."}
                          </p>
                          <p className="desc">
                            <span className="duration">
                              {movie.release_date}
                            </span>
                            <span className="genre">
                              {movie.vote_average.toFixed(1)}
                            </span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              {loading &&
                [...Array(10)].map((_, index) => {
                  return (
                    <div className="card skeleton-card" key={index}>
                      <div className="skeleton-img"></div>
                      <div className="card-body">
                        <div className="skeleton-text title-ske"></div>
                        <div className="skeleton-text desc-ske"></div>
                        <div className="skeleton-text desc-ske"></div>
                      </div>
                    </div>
                  );
                })}
              {error && <div>{error}</div>}
              {!loading && !error && movies.length === 0 && (
                <div className="not-found">
                  <img src="/images/not-found.webp" alt="Not found" />
                </div>
              )}
            </div>
          </div>
          <Pagination setPage={setPage} currentPage={currentPage} />
        </section>
      </>
    </>
  );
}

export default HomePage;
