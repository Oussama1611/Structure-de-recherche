import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SeConnecter from "./components/Pages/SeConnecter";
import Home from "./components/Pages/Home";
import Equipes from "./components/Pages/Equipes";
import Laboratoires from "./components/Pages/Laboratoires";
import Profile from "./components/Pages/Profile";
import ForgotPassword from "./components/Pages/ForgotPassword";
import ModifyProfile from "./components/Pages/ModifyProfile";
import { AuthContext } from "./helpers/AuthContext";
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState(false);
  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

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
        }
      });
  }, []);
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Navbar />
            <div>
              {listOfPosts.map((value, key) => {
                return (
                  <div className="post">
                    <div className="post-title">{value.title}</div>
                    <div className="post-body">{value.post}</div>
                    <div className="post-author">{value.type}</div>
                    <div>
                      <a href={value.supportfile_path}>
                        <button className="login-form__button" type="submit">
                          Voir la publication
                        </button>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </Route>
          <Route path="/equipes">
            <Navbar />
            <Equipes />
          </Route>
          <Route path="/laboratoires">
            <Navbar />
            <Laboratoires />
          </Route>
          <Route path="/profil/:id">
            <Navbar />
            <Profile />
          </Route>
          <Route path="/forgot-password">
            <Navbar />
            <ForgotPassword />
          </Route>
          <Route path="/modify-profile">
            <Navbar />
            <ModifyProfile />
          </Route>
          <AuthContext.Provider value={{ authState, setAuthState }}>
            <Route path="/se-connecter">
              <Navbar />
              <SeConnecter />
            </Route>
          </AuthContext.Provider>
        </Switch>
      </Router>
    </>
  );
}

export default App;
