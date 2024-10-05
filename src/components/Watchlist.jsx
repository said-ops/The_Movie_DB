import React, { useEffect } from "react";
import NavBar from "./NavBar";
import useWatchListSotre from "../store/watchlistStore";
import { Link } from "react-router-dom";

function Watchlist() {
  const fetchWatchlist = useWatchListSotre((state) => state.fetchWatchlist);
  const fetchMovies = useWatchListSotre((state) => state.fetchMovies);
  const movies = useWatchListSotre((state) => state.movies);
  const loadingMovies = useWatchListSotre((state) => state.loadingMovies);
  const errorMovies = useWatchListSotre((state) => state.errorMovies);

  useEffect(() => {
    const loadWatchlist = async () => {
      await fetchWatchlist();
      await fetchMovies(); // Fetch all movies based on watchlist
    };
    loadWatchlist();
  }, []);

  return (
    <>
      <section className="app-container">
        <NavBar />
        <h1 className="watchlist-h">Watchlist</h1>
        <div className="home-container">
          <div className="cards">
            {/* movies cards goes here */}
            {movies &&
              movies.length > 0 &&
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
                          {movie.title.split(" ").slice(0, 3).join(" ") + "..."}
                        </p>
                        <p className="desc">
                          <span className="duration">{movie.release_date}</span>
                          <span className="genre">
                            {movie.vote_average.toFixed(1)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            {/* loader for cards */}
            {loadingMovies && <div className="loader"></div>}
            {/* error image  */}
            {errorMovies && (
              <div className="not-found">
                <img
                  src="/images/somthing-wrong.webp"
                  alt="error fetching movies"
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Watchlist;
