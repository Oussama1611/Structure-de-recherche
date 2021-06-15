import React, { useState, Link } from "react";
import { useHistory } from "react-router-dom";
import "./ForgotPassword.css";

function ModifyProfile() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [numberPhone, setNumberPhone] = useState("");

  return (
    <div className="login-container">
      <div className="login-form__header">Modifier vos informations</div>

      <label>Photo de profile</label>
      <input className="login-form__input" type="file" name="photo" />
      <label>Nom et Prénom</label>
      <input
        className="login-form__input"
        type="text"
        autoComplete="off"
        name="fullname"
        placeholder="Nom et Prénom"
        onChange={(event) => {
          setFullName(event.target.value);
        }}
      />
      <label>Adresse email</label>
      <input
        className="login-form__input"
        type="email"
        name="email"
        placeholder="Email"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <label>Numéro de téléphone</label>
      <input
        className="login-form__input"
        type="text"
        name="numberPhone"
        placeholder="Numéro de telephone"
        onChange={(event) => {
          setNumberPhone(event.target.value);
        }}
      />
      <button className="login-form__button" type="submit">
        Enregistrer
      </button>
    </div>
  );
}

export default ModifyProfile;
