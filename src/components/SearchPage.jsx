import React, { useEffect } from "react";
import NavBar from "./NavBar";
import Pagination from './Pagination'
import useSearchStore from "../store/searchStore";

function SearchPage() {

  const movies = useSearchStore(state=>state.movies)
  const fetchByTerm = useSearchStore(state=>state.fetchByTerm)
  const setPage = useSearchStore(state=>state.setPage)
  const currentPage = useSearchStore(state=>state.currentPage)
  const maxPages = useSearchStore(state=>state.maxPages)
  const searchTerm = useSearchStore(state=>state.searchTerm)
  const setTerm = useSearchStore(state=>state.setTerm)

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(searchTerm){
      fetchByTerm(searchTerm,currentPage)
      // console.log(movies)
    }
  }
  return (
    <>
      <section className="app-container">
        <NavBar />
        <form action="#"
        onSubmit={e=>handleSubmit(e)}
        >
        <div className="search-container">
          <div className="search">
            <label htmlFor="search">Search</label>
            <input
              type="text"
              name="search"
              id="search"
              value={searchTerm}
              onChange={e=>setTerm(e.target.value)}
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
            {movies.length > 0 &&
                movies.map((movie, index) => {
                  return (
                    <div className="card" key={index}>
                      <img
                        src={`https://image.tmdb.org/t/p/w300/${movie.poster_path?movie.poster_path:movie.backdrop_path}`}
                        alt=""
                      />
                      <div className="card-body">
                        <p className="movie-title">
                          {movie.title.split(" ").slice(0, 3).join(" ") + "..."}
                        </p>
                        <p className="desc">
                          <span className="duration">{movie.release_date}</span>
                          <span className="genre">
                            {movie.vote_average&&movie.vote_average.toFixed(1)}
                          </span>
                        </p>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
        {maxPages>1&&<Pagination setPage={setPage} currentPage={currentPage}/>}
      </section>
    </>
  );
}

export default SearchPage;
