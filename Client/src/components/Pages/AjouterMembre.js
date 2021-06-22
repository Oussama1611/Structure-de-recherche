import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./ForgotPassword.css";
import { AuthContext } from "../../helpers/AuthContext";


function NewMembre () {
    
    const { idTeam } = useParams();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [full_name,setFullName] = useState("");
    var id="";

    //------------------------------
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
    //-------------------------------
    let history = useHistory();
    const saveData = ()=>{
    
    const data = {
      username :username,
      password:password,
      full_name : full_name,
      TeamId : idTeam
    };
    
    axios.post("http://localhost:3001/auth", data).then((response) => { // ajouer user dans la table Users
        if (response.data.error) {
          alert(response.data.error);
        } else {
          sessionStorage.setItem("accessToken", response.data); 
        }
      }); 
    }
    const GetId= (username) => {

      axios.get(`http://localhost:3001/auth/getId/${username}`)
      .then((response)=>id=response.data.id);
    }
    
    const saveInfo = (id) => {

        const contact ={
          UserId :id
        }
        
        axios.post("http://localhost:3001/contact",contact);    
    }

    const wrapperSaver =() => {
        saveData();
        setTimeout(()=>GetId(username),200);
        setTimeout(()=>saveInfo(id),700);
        setTimeout(()=>history.push(`/GererMembres/${idTeam}`),900);
    }


    return (
        <AuthContext.Provider value={{ authState, setAuthState }}>
        <div className="login-container">
          <div className="login-form__header">Ajouter un utilisateur pour le nouveau membre</div>
      
          <label>Username</label>
          <input
            className="login-form__input"
            type="text"
            name="username"
            placeholder="Username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <label>Password</label>
          <input
            className="login-form__input"
            type="password"
            name="password"
            placeholder="Mot de passe"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <label>Nom Complet </label>
          <input
            className="login-form__input"
            type="text"
            name="Name"
            placeholder="Nom de nouveau membre"
            onChange={(event) => {
              setFullName(event.target.value);
            }}
          />
        
          <button className="login-form__button" type="submit"
          onClick={wrapperSaver}>
            Ajouter Membre
          </button>
          <button
              className="login-form__button"
              type="submit"
              onClick={() => {
                history.push(`/GererMembres/${idTeam}`);
              }}
            >
              Annuler
            </button>
        </div>
        </AuthContext.Provider>
      );
}


export default NewMembre;