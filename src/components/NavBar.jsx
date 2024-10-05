import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";
import usePopularStore from "../store/PopularMoviesStore";

function NavBar() {
  const signOut = useAuthStore((state) => state.signOut);
  const user = useAuthStore((state) => state.user);
  const setTheme = usePopularStore((state) => state.setTheme);
  const theme = usePopularStore((state) => state.theme);

  //handle menu
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  
    
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <nav>
        <h1>MovieDB</h1>
        <ul className={`nav-links  ${isOpen ? "" : "hide-menu"}`}>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/Search">
            <li>Find Movie</li>
          </Link>
          <Link to="/Watchlist">
            <li>Watchlist</li>
          </Link>
          <li>
            <img
              src={`/images/icon-${theme==='dark' ? "sun" : "moon"}.svg`}
              alt=""
              onClick={() =>  setTheme(theme === 'light' ? 'dark' : 'light')}
            />
          </li>
          {user ? (
            <li onClick={signOut}>Sign Out</li>
          ) : (
            // <Link to="/sign-in">
            //   <li>Sign</li>
            // </Link>
            ""
          )}
        </ul>
        <div className="menu-icon" onClick={handleClick}>
          <img
            src={`/images/${isOpen ? "icon-close" : "icon-hamburger"}.svg`}
            alt="menu"
          />
        </div>
      </nav>
    </>
  );
}

export default NavBar;
