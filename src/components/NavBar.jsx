import React,{useState} from 'react'
import { Link } from 'react-router-dom'

function NavBar() {

  //handle menu
 const [isOpen,setIsOpen]=useState(false)
  const handleClick = ()=>{
    setIsOpen(!isOpen)
  }

 
  return (
    <>
        <nav>
            <h1>MovieDB</h1>
            <ul className={`nav-links  ${isOpen ? '' : 'hide-menu'}`}>
              <Link to='/'><li>Home</li></Link>
              <Link to='/Search'><li>Find Movie</li></Link>
              <Link to='/Watchlist'><li>Watchlist</li></Link>
              <Link to='/Sign-In'><li>Sign</li></Link>
            </ul>
            <div  
            className='menu-icon'
            onClick={handleClick}
            >
              <img 
              src={`/images/${isOpen?'icon-close':'icon-hamburger'}.svg`} 
              alt="menu"
               />
            </div>
        </nav>
    </>
  )
}

export default NavBar