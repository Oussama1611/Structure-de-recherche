import React, { useState } from "react";
import "./ForgotPassword.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  let history = useHistory();

  const enregistrer = () => {
    const data = {
      username: username,
      password: password,
      confirmPassword: confirmPassword
    };
    axios.post("http://localhost:3001/auth/forgot-password", data).then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          sessionStorage.setItem("accessToken", response.data);
          alert(response.data);
          history.push("/se-connecter");
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
          setUsername(event.target.value);}}
      />
      <label>Nouveau mot de passe</label>
      <input
        className="login-form__input"
        type="password"
        name="username"
        placeholder="Mot de passe"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <label>Confirmer le nouveau mot de passe</label>
      <input
        className="login-form__input"
        type="password"
        name="username"
        placeholder="Mot de passe"
        onChange={(event) => {
          setConfirmPassword(event.target.value);
        }}
      />
      <button
        className="login-form__button"
        type="submit"
        onClick={enregistrer}
      >
        Enregistrer
      </button>
    </div>
  );
}

export default ForgotPassword;
