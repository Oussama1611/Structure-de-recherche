import React, { useState } from "react";
import "./Card.css";
import { Button } from "./Button";

function Card(props) {
  const [button, setButton] = useState(true);
  return (
    <div className="card_container">
      <div className="card">
        <div className="top">
          <h2 className="name">{props.username}</h2>
          <img className="circle-img" src={props.img} alt="avatar_img" />
        </div>
        <div className="bottom">
          <p className="info">{props.tel}</p>
          <p className="info">{props.email}</p>
        </div>
      </div>
      <div className="buttons">
        <div className="first_button">
          <button className="login-form__button" type="submit">
            Publier
          </button>
        </div>
        <div className="second_button">
          <button className="login-form__button" type="submit">
            Supprimer
          </button>
        </div>
        <div className="third_button">
          <button className="login-form__button" type="submit">
            Modifier le profil
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
