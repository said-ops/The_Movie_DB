import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion
import useAuthStore from "../store/authStore";
import usePopularStore from "../store/PopularMoviesStore";

function NavBar() {
  const signOut = useAuthStore((state) => state.signOut);
  const user = useAuthStore((state) => state.user);
  const setTheme = usePopularStore((state) => state.setTheme);
  const theme = usePopularStore((state) => state.theme);

  // Handle menu
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
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
          <motion.li
            animate={{ rotate: theme === "dark" ? 90 : 0 }} // Rotation animation
            transition={{ type: "spring", stiffness: 300 }} // Smooth spring animation
          >
            <img
              src={`/images/icon-${theme === "dark" ? "sun" : "moon"}.svg`}
              alt="Theme Toggle"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            />
          </motion.li>
          {user && <li onClick={signOut}>Sign Out</li>}
        </ul>
        {/* Menu icon with animation */}
        <motion.div
          className="menu-icon"
          onClick={handleClick}
          animate={{ rotate: isOpen ? 90 : 0 }} // Rotation animation
          transition={{ type: "spring", stiffness: 300 }} // Smooth spring animation
        >
          <img
            src={`/images/${isOpen ? "icon-close" : "icon-hamburger"}.svg`}
            alt="menu"
          />
        </motion.div>
      </nav>
    </>
  );
}

export default NavBar;
