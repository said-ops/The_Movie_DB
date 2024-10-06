import React, { useEffect } from "react";
import NavBar from "./NavBar";
import usePopularStore from "../store/PopularMoviesStore";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <section className="app-container">
        <NavBar />
        <div className="home-container">
          <h1>Top-100 Movies of All Time</h1>
          <div className="cards">
            {movies.length > 0 &&
              movies.map((movie, index) => {
                return (
                  <Link to={`/details/${parseInt(movie.id)}`} key={index}>
                    <motion.div
                      className="card"
                      key={index}
                      initial="hidden"
                      animate="visible"
                      variants={cardVariants}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                        alt={movie.title}
                      />
                      <div className="card-body">
                        <p className="movie-title">
                          {movie.title.split(" ").slice(0, 3).join(" ") + "..."}
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
                    </motion.div>
                  </Link>
                );
              })}
              
            {/* Skeleton loaders */}
            {loading &&
              [...Array(10)].map((_, index) => {
                return (
                  <motion.div
                    className="card skeleton-card"
                    key={index}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="skeleton-img"></div>
                    <div className="card-body">
                      <div className="skeleton-text title-ske"></div>
                      <div className="skeleton-text desc-ske"></div>
                      <div className="skeleton-text desc-ske"></div>
                    </div>
                  </motion.div>
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
  );
}

export default HomePage;

