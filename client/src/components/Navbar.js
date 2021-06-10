import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            StR
            <i class="fas fa-microscope"></i>
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Accueil
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/Laboratoires"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Laboratoires
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/Equipes"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Equipes
              </Link>
            </li>

            <li>
              <Link
                to="/Se-connecter"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                Se connecter
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle="btn--outline">Se connecter</Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
