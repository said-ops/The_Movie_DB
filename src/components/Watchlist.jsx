import React, { useEffect } from 'react'
import NavBar from './NavBar'
import useWatchListSotre from '../store/watchlistStore'

function Watchlist() {

    const watchList = useWatchListSotre(state=>state.watchList)
    const fetchWatchlist = useWatchListSotre(state=>state.fetchWatchlist)
    useEffect(()=>{
        
        const loadWatchlist = async () => {
            await fetchWatchlist(); 
            console.log(watchList); 
        };
        loadWatchlist()
    },[])
  return (
    <>
        <section className='app-container'>
                <NavBar/>
                <h1 className='watchlist-h'>Watchlist</h1>
                <div className='home-container'>
                    <div className='cards'>
                        {/* movies cards goes here */}
                        <div className="card">
                            <img src="/images/movie-poster.jpg" alt="" />
                            <div className="card-body">
                                <p className='movie-title'>Avengers holy moly</p>
                                <p className='desc'>
                                    <span className='duration'>1h45min</span>
                                    <span className='genre'>Action</span>
                                </p>
                            </div>
                        </div>
                        <div className="card">
                            <img src="/images/movie-poster.jpg" alt="" />
                            <div className="card-body">
                                <p className='movie-title'>Avengers holy moly</p>
                                <p className='desc'>
                                    <span className='duration'>1h45min</span>
                                    <span className='genre'>Action</span>
                                </p>
                            </div>
                        </div>
                        <div className="card">
                            <img src="/images/movie-poster.jpg" alt="" />
                            <div className="card-body">
                                <p className='movie-title'>Avengers holy moly</p>
                                <p className='desc'>
                                    <span className='duration'>1h45min</span>
                                    <span className='genre'>Action</span>
                                </p>
                            </div>
                        </div>
                        <div className="card">
                            <img src="/images/movie-poster.jpg" alt="" />
                            <div className="card-body">
                                <p className='movie-title'>Avengers holy moly</p>
                                <p className='desc'>
                                    <span className='duration'>1h45min</span>
                                    <span className='genre'>Action</span>
                                </p>
                            </div>
                        </div>
                        <div className="card">
                            <img src="/images/movie-poster.jpg" alt="" />
                            <div className="card-body">
                                <p className='movie-title'>Avengers holy moly</p>
                                <p className='desc'>
                                    <span className='duration'>1h45min</span>
                                    <span className='genre'>Action</span>
                                </p>
                            </div>
                        </div>
                        <div className="card">
                            <img src="/images/movie-poster.jpg" alt="" />
                            <div className="card-body">
                                <p className='movie-title'>Avengers holy moly</p>
                                <p className='desc'>
                                    <span className='duration'>1h45min</span>
                                    <span className='genre'>Action</span>
                                </p>
                            </div>
                        </div>
                        <div className="card">
                            <img src="/images/movie-poster.jpg" alt="" />
                            <div className="card-body">
                                <p className='movie-title'>Avengers holy moly</p>
                                <p className='desc'>
                                    <span className='duration'>1h45min</span>
                                    <span className='genre'>Action</span>
                                </p>
                            </div>
                        </div>
                        <div className="card">
                            <img src="/images/movie-poster.jpg" alt="" />
                            <div className="card-body">
                                <p className='movie-title'>Avengers holy moly</p>
                                <p className='desc'>
                                    <span className='duration'>1h45min</span>
                                    <span className='genre'>Action</span>
                                </p>
                            </div>
                        </div>
                        <div className="card">
                            <img src="/images/movie-poster.jpg" alt="" />
                            <div className="card-body">
                                <p className='movie-title'>Avengers holy moly</p>
                                <p className='desc'>
                                    <span className='duration'>1h45min</span>
                                    <span className='genre'>Action</span>
                                </p>
                            </div>
                        </div>
                        <div className="card">
                            <img src="/images/movie-poster.jpg" alt="" />
                            <div className="card-body">
                                <p className='movie-title'>Avengers holy moly</p>
                                <p className='desc'>
                                    <span className='duration'>1h45min</span>
                                    <span className='genre'>Action</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    </>
  )
}

export default Watchlist