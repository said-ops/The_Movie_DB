import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";

function NavBar() {
  const signOut = useAuthStore((state) => state.signOut);
  const user = useAuthStore((state) => state.user);

  //handle menu
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

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
          {user ? (
            <li onClick={signOut}>Sign Out</li>
          ) : (
            <Link to="/Sign-In">
              <li>Sign</li>
            </Link>
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
