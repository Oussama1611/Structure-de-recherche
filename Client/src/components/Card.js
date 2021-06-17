import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom"
import "./Card.css";
import { AuthContext } from "../helpers/AuthContext";
import axios from "axios";

function Card(props) {
  const [button, setButton] = useState(true);
  const [boolean1,setBool1] = useState(false);
  const [boolean2,setBool2] = useState(false);
  const [id_user, setId ]= useState(); 
//---------------------------------------------

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
          setId(response.data.id);
        }
      });
  },
//------------------------
    
    axios.get(`http://localhost:3001/labos/responsable-ou-non/${id_user}`)
      .then((response)=>{
        if(response.data.error) setBool1(false);
        else setBool1(true);
      }),
  
  //--------------------------
    axios.get(`http://localhost:3001/teams/responsable-ou-non/${id_user}`)
    .then((response)=>{
      if(response.data.error) setBool2(false);
      else setBool2(true);
    })
  //----------------------
  ,[]);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
    <div className="card_container">
      <div className="card">
        <div className="top">
          <h2 className="name">{props.name}</h2>
          <img className="circle-img" src={props.img} alt="avatar_img" />
        </div>
        <div className="bottom">
          <p className="info">{props.tel}</p>
          <p className="info">{props.email}</p>
          <p><a className="info" href={`//${props.site}`}>{props.site}</a></p>
          <p className="info">{props.bio}</p>
        </div>
      </div>
      {authState ? (
        <> 
        <>
            <Link to="/publier">
              <button className="login-form__button" type="submit">
              Gérer mes publications
              </button>
            </Link>
      
            <Link to="/modify-profile">
              <button className="login-form__button" type="submit">
              Modifier mon profil
              </button>
            </Link>
          </>

        { (boolean1 || boolean2) ? (
            <>
            <Link to="/gerer-les-membres">
              <button className="login-form__button" type="submit">
              Gérer mon laboratoire / mon équipe
              </button>
            </Link>
          </>
        ) : (<div></div>)
        }
        </>):(<div></div>)}
        </div>
    </AuthContext.Provider> 
   
  );
}

export default Card;