import React, { useState } from "react";
import NavBar from "./NavBar";
import Pagination from "./Pagination";
import useSearchStore from "../store/searchStore";
import { Link } from "react-router-dom";

function SearchPage() {
  const movies = useSearchStore((state) => state.movies);
  const fetchByTerm = useSearchStore((state) => state.fetchByTerm);
  const setPage = useSearchStore((state) => state.setPage);
  const currentPage = useSearchStore((state) => state.currentPage);
  const maxPages = useSearchStore((state) => state.maxPages);
  const searchTerm = useSearchStore((state) => state.searchTerm);
  const setTerm = useSearchStore((state) => state.setTerm);
  const loading = useSearchStore((state) => state.loading);
  const error = useSearchStore((state) => state.error);
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      setQuery(searchTerm);
      fetchByTerm(searchTerm, currentPage);
    }
  };
  return (
    <>
      <section className="app-container">
        <NavBar />
        {/* search form  */}
        <form action="#" onSubmit={(e) => handleSubmit(e)}>
          <div className="search-container">
            <div className="search">
              <label htmlFor="search">Search</label>
              <input
                type="text"
                name="search"
                id="search"
                value={searchTerm}
                onChange={(e) => setTerm(e.target.value)}
              />
              <button type="submit" className="search-btn">
                Search
              </button>
            </div>
          </div>
        </form>
        <div className="home-container">
          {/* display the heading after submition */}
          {query ? (
            <h1>
              Search Results For :<span className="search-term">{query}</span>
            </h1>
          ) : (
            ""
          )}
          <div className="cards">
            {/* initial image to display  */}
            {!loading && !error && movies.length===0 &&!query&&(
              <div className="not-found">
                <img src="/images/post-result.png" alt="look for a movie" />
              </div>
            )}
            {/* movies cards goes here */}
            {movies.length > 0 &&
              movies.map((movie, index) => {
                return (
                  <Link key={index} to={`/details/${movie.id}`}>
                    <div className="card" >
                    <img
                      src={
                        movie.poster_path || movie.backdrop_path
                          ? `https://image.tmdb.org/t/p/w300/${
                              movie.poster_path || movie.backdrop_path
                            }`
                          : "https://placehold.jp/150x250.png"
                      }
                      alt=""
                    />
                    <div className="card-body">
                      <p className="movie-title">
                        {movie.title.split(" ").slice(0, 3).join(" ") + "..."}
                      </p>
                      <p className="desc">
                        <span className="duration">{movie.release_date}</span>
                        <span className="genre">
                          {movie.vote_average && movie.vote_average.toFixed(1)}
                        </span>
                      </p>
                    </div>
                  </div>
                  </Link>
                );
              })}
            {/* skeleton goes here */}
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
            {/* error message handling */}
            {error && <div className="not-found">
              <img src="/images/somthing-wrong.webp" alt="Something went wrong" />
              </div>}
            {/* no result is found */}
            {!loading && !error && movies.length === 0 && query && (
              <div className="not-found">
                <img src="/images/not-found.webp" alt="Not found" />
              </div>
            )}
          </div>
        </div>
        {/* pagination component */}
        {maxPages > 1 && (
          <Pagination setPage={setPage} currentPage={currentPage} />
        )}
      </section>
    </>
  );
}

export default SearchPage;
