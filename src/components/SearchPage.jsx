import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Pagination from "./Pagination";
import useSearchStore from "../store/searchStore";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion

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
  const query = useSearchStore((state) => state.query);
  const setQuery = useSearchStore((state) => state.setQuery);

  //filter params
  const sortBy = useSearchStore((state) => state.sortBy);
  const setSortBy = useSearchStore((state) => state.setSortBy);
  const genre = useSearchStore((state) => state.genre);
  const setGenre = useSearchStore((state) => state.setGenre);
  const sortMovies = useSearchStore((state) => state.sortMovies);

  //search a movie by name
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchTerm) {
      setQuery(searchTerm);
     await fetchByTerm(searchTerm, 1);
     setSortBy('')
     setGenre('')
    }
  };

  //fetch movies based on genre
  useEffect(() => {
    if (genre) {
      fetchByTerm("", 1);
      setQuery('');
      setSortBy('')
      setTerm('')
    }
  }, [genre]);

  //sort results based on year or rate
  useEffect(() => {
    if (sortBy) {
      sortMovies();
      setGenre('')
    }
  }, [sortBy]);

  // Variants for input animation
  const inputVariants = {
    normal: { width: "300px" },
    focused: { width: "310px" },
  };

  //card variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
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
              <motion.input
                type="text"
                name="search"
                id="search"
                value={searchTerm}
                onChange={(e) => setTerm(e.target.value)}
                // Add variants and event handlers for animation
                variants={inputVariants}
                initial="normal"
                animate={searchTerm ? "focused" : "normal"}
                transition={{ type: "spring", stiffness: 300 }}
                onFocus={(e) => {
                  e.target.value = searchTerm; // Maintain the value on focus
                }}
              />
              {/* Sorting by Rating or Year */}
              <div className="filter-container">
                <div className="filter">
                  <label htmlFor="sort">Sort By:</label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option value="year">Year</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
                {/* filtring by genre */}
                <div className="filter">
                  <label htmlFor="genre">Filter By:</label>
                  <select
                    id="genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                  >
                    <option value="">All Genres</option>
                    <option value="28">Action</option>
                    <option value="878">Science Fiction</option>
                    <option value="18">Drama</option>
                  </select>
                </div>
              </div>
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
            {!loading && !error && movies.length === 0 && !query && (
              <div className="not-found">
                <img src="/images/post-result.png" alt="look for a movie" />
              </div>
            )}
            {/* movies cards goes here */}
            {movies.length > 0 &&
              movies.map((movie, index) => {
                return (
                  <Link key={index} to={`/details/${movie.id}`}>
                    <motion.div
                      className="card"
                      key={index}
                      initial="hidden"
                      animate="visible"
                      variants={cardVariants}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0px 4px 15px rgba(0,0,0,0.3)",
                      }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <img
                        src={
                          movie.poster_path || movie.backdrop_path
                            ? `https://image.tmdb.org/t/p/w300/${
                                movie.poster_path || movie.backdrop_path
                              }`
                            : "https://placehold.jp/150x250.png"
                        }
                        alt={movie.title}
                      />
                      <div className="card-body">
                        <p className="movie-title">
                          {movie.title.split(" ").slice(0, 3).join(" ") + "..."}
                        </p>
                        <p className="desc">
                          <span className="duration">{movie.release_date}</span>
                          <span className="genre">
                            {movie.vote_average?movie.vote_average.toFixed(1):0}
                          </span>
                        </p>
                      </div>
                    </motion.div>
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
            {error && (
              <div className="not-found">
                <img
                  src="/images/somthing-wrong.webp"
                  alt="Something went wrong"
                />
              </div>
            )}
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
