import React, { useState } from "react";
import "./Card.css";
import Buttons from "./Buttons";

function Card(props) {
  const responsable = false;
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
      {responsable ? (
        <div>
          <Buttons button={"Publier"} />
          <Buttons button={"Supprimer"} />
          <Buttons button={"Modifier le profil"} />
        </div>
      ) : (
        <div>
          <Buttons button={"Publier"} />
          <Buttons button={"Supprimer"} />
          <Buttons button={"Modifier le profil"} />
          <Buttons button={"Gerer les memebres"} />
        </div>
      )}
    </div>
  );
}

export default Card;
