import React from 'react'

function NavBar() {
  return (
    <>
        <nav>
            <h1>MovieDB</h1>
            <ul className='nav-links'>
            <li>Home</li>
            <li>Find Movie</li>
            <li>Watchlist</li>
            <li>Sign</li>
            </ul>
        </nav>
    </>
  )
}

export default NavBar