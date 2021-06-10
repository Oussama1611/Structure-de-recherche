import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SeConnecter from "./components/Pages/SeConnecter";
import Home from "./components/Pages/Home";
import Equipes from "./components/Pages/Equipes";
import Laboratoires from "./components/Pages/Laboratoires";
import Profile from "./components/Pages/Profile";
import ForgotPassword from "./components/Pages/ForgotPassword";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Navbar />
          </Route>
          <Route path="/equipes">
            <Equipes />
          </Route>
          <Route path="/laboratoires">
            <Laboratoires />
          </Route>
          <Route path="/profile/:id">
            <Profile />
          </Route>
          <Route path="/forgot-password">
            <Navbar />
            <ForgotPassword />
          </Route>
          <Route path="/se-connecter">
            <Navbar />
            <SeConnecter />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
