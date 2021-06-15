import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { AuthContext } from "../helpers/AuthContext";
import axios from "axios";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [authState, setAuthState] = useState(false);
  const [id, setId]=useState();

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/tokenValidating", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState(false);
        } else {
          setAuthState(true);
          setId(response.data.id);
        }
      });
  }, []);
  //-----------------
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const logout = () => {
    localStorage.removeItem("accessToken");
  }

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
  //----------------------
  

  return (
    <>
      <nav className="navbar">
      <AuthContext.Provider value={{ authState, setAuthState }}>
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
          {!authState ? (
          <> 
          {button && <Button buttonStyle="btn--outline">Se connecter</Button>}
          </>
          ) : (
            <>
            <Link
             to={`/profil/${id}`}
             className="nav-links"
             onClick={closeMobileMenu}
             >  
             Mon Profil
             </Link>
            
            {button && <Button onClick={logout} buttonStyle="btn--outline">Déconnecter</Button>}
            </>
          )}
        </div>
        </AuthContext.Provider>
      </nav>
    </>
  );
}

export default Navbar;
