import React, { useEffect } from "react";
import NavBar from "./NavBar";
import useDetailsStore from "../store/movieDetailsStore";
import { useParams } from "react-router-dom";
import useWatchListSotre from "../store/watchlistStore";

function MovieDetails() {
  const laoding = useDetailsStore((state) => state.loading);
  const error = useDetailsStore((state) => state.error);
  const details = useDetailsStore((state) => state.details);
  const fetchDetails = useDetailsStore((state) => state.fetchDetails);
  const fetchTrailer = useDetailsStore((state) => state.fetchTrailer);
  const trailer = useDetailsStore((state) => state.trailer);
  const trailerError = useDetailsStore((state) => state.trailerError);
  const trailerLoading = useDetailsStore((state) => state.trailerLoading);
  const fetchCasts = useDetailsStore((state) => state.fetchCasts);
  const castsLoading = useDetailsStore((state) => state.castsLoading);
  const castsError = useDetailsStore((state) => state.castsError);
  const casts = useDetailsStore((state) => state.casts);
  const { id } = useParams();
  //watchlis add remove 
  const addToWatchList = useWatchListSotre(state=>state.addToWatchList)
  const loading = useWatchListSotre(state=>state.loading)
  const errorW = useWatchListSotre(state=>state.errorW)
  const isInWatchlist = useWatchListSotre(state=>state.isInWatchlist)
  const removeFromWatchlist = useWatchListSotre(state=>state.removeFromWatchlist)

  useEffect(() => {
    fetchDetails(id);
    fetchTrailer(id);
    fetchCasts(id);
    // fetchWatchlist()
  }, [id]);

  
  return (
    <>
      <section className="app-container"  
      style={details&&{backgroundImage:`url(https://image.tmdb.org/t/p/original/${details.backdrop_path})`,
      backgroundRepeat:'no-repeat',
      backgroundSize:'cover',
      backgroundPosition:'center',
      zIndex:'1'
      }}>
        <NavBar />
        <>
          {details &&!error && !laoding&& (
            <>
              <div className="title">
                <h1>{details.original_title}</h1>
                {!isInWatchlist(id)?
                // add to watch list 
                <div className="bookmark" onClick={()=>addToWatchList(id)}>
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
                  <p>{loading?'loading':'Bookmark'}</p>
                </div>
                :
                //remove from whatch list
                <div className="bookmark" onClick={()=>removeFromWatchlist(id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30px"
                    height="30px"
                    viewBox="0 0 24 24"
                    fill="#ffd700"
                  >
                    <path
                      d="M5 6.2C5 5.07989 5 4.51984 5.21799 4.09202C5.40973 3.71569 5.71569 3.40973 6.09202 3.21799C6.51984 3 7.07989 3 8.2 3H15.8C16.9201 3 17.4802 3 17.908 3.21799C18.2843 3.40973 18.5903 3.71569 18.782 4.09202C19 4.51984 19 5.07989 19 6.2V21L12 16L5 21V6.2Z"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      // style="&#10;"
                    />
                  </svg>
                  <p>{loading?'loading':'Bookmarked'}</p>
                </div>
                }
              </div>
              <div className="infos"
              
              >
                <div className="details">
                  <div className="poster">
                    {/* display skeleton or the poster */}
                    {laoding ? (
                      <div className="card skeleton-card">
                        <div className="skeleton-img"></div>
                      </div>
                    ) : (
                      <img
                        src={
                          details.poster_path || details.backdrop_path
                            ? `https://image.tmdb.org/t/p/w300/${
                                details.poster_path || details.backdrop_path
                              }`
                            : "https://placehold.jp/150x250.png"
                        }
                        alt="poster"
                      />
                    )}
                  </div>
                  <div className="text">
                    <div className="genres">
                      {details.genres
                        ? details.genres.map((genre, index) => {
                            return (
                              <span className="genr" key={index}>
                                {genre.name}
                              </span>
                            );
                          })
                        : ""}
                    </div>
                    <p className="summary">{details.overview}</p>
                    <div className="rates">
                      <div className="rate">
                        <span className="rate-text">IMDB rating</span>
                        <span className="rate-metrics">
                          {details.vote_average.toFixed(2)}/
                          <span className="base-rate">10</span>
                        </span>
                      </div>
                      <div className="rate">
                        <span className="rate-text">Release Date</span>
                        <span className="rate-metrics">
                          {details.release_date}
                        </span>
                      </div>
                      <div className="rate">
                        <span className="rate-text">Original Language</span>
                        <span className="rate-metrics">
                          {details.original_language}
                        </span>
                      </div>
                      <div className="rate">
                        <span className="rate-text">Status</span>
                        <span className="rate-metrics">{details.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="trailer">
                  {/* displaying trailer */}
                  {trailer &&!trailerError &&!trailerLoading && (
                    <iframe
                      width="423px"
                      height="319px"
                      src={trailer}
                      title="Movie Trailer"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  )}
                  {/* display loader for the trailer */}
                  {trailerLoading && <div className="skeleton-iframe"></div>}
                  {/* display error for the trailer */}
                  {trailerError&&(<h2>Something went wrong</h2>)}
                </div>
              </div>
              <h2 className="cast-h">Cast</h2>
              <div className="casts"
              >
                {/* display cast  */}
                {!castsLoading && !castsError && casts.length > 0 &&
                  casts.map((cast, index) => {
                    return (
                      <div className="cast" key={index}>
                        <img
                          src={`${
                            cast.profile_path
                              ? `https://image.tmdb.org/t/p/w200/${cast.profile_path}`
                              : "https://placehold.jp/150x250.png"
                          }`}
                          alt={cast.name}
                        />
                        <div className="cast-info">
                          <span className="cast-name">name:{cast.name}</span>
                          <span className="cast-role">
                            character:{cast.character}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  {/* display loader for cast */}
                  {castsLoading && (
                    Array(8).fill().map((_, index) => (
                      <div className="skeleton" key={index}></div>
                    ))
                  )}
                  {/* display error for cast */}
                  {castsError&&(<h2>Something went wrong</h2>)}
              </div>
            </>
          )}
          {/* details loading */}
          {laoding&&<div className="loader"></div>}
          {/* error fetching details */}
          {error&&<div className="not-found"><img src="/images/somthing-wrong.webp" alt="error fetching details" /></div>}
        </>
      </section>
    </>
  );
}

export default MovieDetails;
