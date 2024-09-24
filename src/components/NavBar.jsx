import React,{useEffect, useState} from 'react'

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
              <li>Home</li>
              <li>Find Movie</li>
              <li>Watchlist</li>
              <li>Sign</li>
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