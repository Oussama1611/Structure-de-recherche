import React,{ useState, useEffect, Component } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SeConnecter from "./components/Pages/SeConnecter";
import Home from "./components/Pages/Home";
import Equipes from "./components/Pages/Equipes";
import Laboratoires from "./components/Pages/Laboratoires";
import Profile from "./components/Pages/Profile";
import ForgotPassword from "./components/Pages/ForgotPassword";
import ModifyProfile from "./components/Pages/ModifyProfile";
import PostById from "./components/Pages/PostsManagement";
import NewPost from "./components/Pages/NewPost";
import Labo from "./components/Pages/LaboById";
import Team from "./components/Pages/TeamById";
import GererLabos from "./components/Pages/GererLabos";
import GererTeams from "./components/Pages/GererTeams";
import GererMembres from "./components/Pages/GererMembres";
import NewMembre from "./components/Pages/AjouterMembre";
import NewLabo from "./components/Pages/AjouterLabo";
import NewTeam from "./components/Pages/AjouterTeam";
import { AuthContext } from "./helpers/AuthContext";
import axios from "axios";

function App() {
const [authState, setAuthState] = useState(false);
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
            <Home />
          </Route>
          <Route exact path="/equipes">
            <Navbar />
            <Equipes />
          </Route>
          <Route exact path="/equipes/:id">
            <Navbar />
            <Team />
          </Route>
          <Route exact path="/laboratoires">
            <Navbar />
            <Laboratoires />
          </Route>
          <Route exact path="/laboratoires/:id">
            <Navbar />
            <Labo />
          </Route>
          <Route path="/profil/:id">
            <Navbar />
            <Profile />
          </Route>
          <Route path="/forgot-password">
            <Navbar />
            <ForgotPassword />
          </Route>
          <Route path="/PostById/:id">
            <Navbar />
            <PostById />
          </Route>
          <Route path="/new-post">
            <Navbar />
            <NewPost />
          </Route>
          <Route path="/modify-profile">
            <Navbar />
            <ModifyProfile />
          </Route>
          <Route path="/GererLabos">
            <Navbar />
            <GererLabos />
          </Route>
          <Route path="/GererTeams/:idLabo">
            <Navbar />
            <GererTeams />
          </Route>
          <Route path="/GererMembres/:idTeam">
            <Navbar />
            <GererMembres />
          </Route>
          <Route exact path="/NewLabo">
            <Navbar />
            <NewLabo />
          </Route>
          <Route exact path="/NewTeam/:idLabo">
            <Navbar />
            <NewTeam />
          </Route>
          <Route exact path="/NewMembre/:idTeam">
            <Navbar />
            <NewMembre />
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
