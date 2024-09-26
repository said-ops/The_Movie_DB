import React from 'react'
import NavBar from './NavBar'

function MovieDetails() {
  return (
    <>
        <section className='app-container'>
            <NavBar/>
            <div className='title'>
                <h1>The Gray Man</h1>
                <div className='bookmark'>
                    <img src="/images/bookmark.svg" alt="bookmark" />
                    <p>Bookmark</p>
                </div>
                <div className='infos'>
                    <div className='details'>
                        <div className="poster">
                            <img src="/images/movie-poster.jpg" alt="poster" />
                        </div>
                        <div className="text">
                            <div className='genres'>
                                <span className='genr'>Action</span>
                            </div>
                        </div>
                    </div>
                    <div className='trailer'></div>
                </div>
            </div>
        </section>
    </>
  )
}

export default MovieDetails