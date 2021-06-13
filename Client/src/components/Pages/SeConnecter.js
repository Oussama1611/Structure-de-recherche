import React, { useState, useContext } from "react";
import "./SeConnecter.css";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";

function SeConnecter() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const  { setAuthState } = useContext(AuthContext);

  let history = useHistory();

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data);
        setAuthState(true);
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
        type="email"
        autoComplete="off"
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
      <button className="login-form__button" type="submit" onClick={login}>
        Se connecter
      </button>
      <div class="login-forgot-password">
        <Link class="login-form__link" to="/forgot-password">
          Mot de passe oublié?
        </Link>
      </div>
    </div>
  );
}

export default SeConnecter;
