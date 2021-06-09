import React, { useState } from "react";
import { Button } from "../Button";
import Navbar from "../Navbar";
import "./SeConnecter.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

function SeConnecter(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        sessionStorage.setItem("accessToken", response.data);
        history.push("/");
      }
    });
  };

  return (
    <div className="login-container">
      <div className="login-form__header">Se connecter à votre compte</div>
      <label>Nom d'utilisateur</label>
      <input
        className="login-form__input"
        type="text"
        name="username"
        placeholder="Nom d'utilisateur"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <label>Mot de passe</label>
      <input
        className="login-form__input"
        type="password"
        name="username"
        placeholder="Mot de passe"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button className="login-form__button" type="submit">
        Se connecter
      </button>
      <div class="login-forgot-password">
        <a class="login-form__link" href="./">
          Mot de passe oublié?
        </a>
      </div>
    </div>
  );
}

export default SeConnecter;
