import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Card.css";

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
      <div>
         
        {responsable ? (
          <>
            //If responsable is connected then:
            <Link to="/publier">
              <button className="login-form__button" type="submit">
                Publier
              </button>
            </Link>
            <Link to="/supprimer-publication">
              <button className="login-form__button" type="submit">
                Supprimer
              </button>
            </Link>
            <Link to="/modify-profile">
              <button className="login-form__button" type="submit">
                Modifier le profile
              </button>
            </Link>
            <Link to="/gerer-les-membres">
              <button className="login-form__button" type="submit">
                Gerer les membres
              </button>
            </Link>
          </>
        ) : (
          <> 
            //If responsable is not the one connected then:
            <Link to="/publier">
              <button className="login-form__button" type="submit">
                Publier
              </button>
            </Link>
            <Link to="/supprimer-publication">
              <button className="login-form__button" type="submit">
                Supprimer
              </button>
            </Link>
            <Link to="/modify-profile">
              <button className="login-form__button" type="submit">
                Modifier le profile
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Card;
