import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./ForgotPassword.css";
import { AuthContext } from "../../helpers/AuthContext";

function NewLabo() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [full_name, setFullName] = useState("");
  const [laboratoire, setLabo] = useState("");
  const [sommaire, setSummary] = useState("");
  var id = "";

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
  const saveData = () => {
    const data = {
      username: username,
      password: password,
      full_name: full_name,
      TeamId: null,
    };
    axios.post("http://localhost:3001/auth", data).then((response) => {
      // ajouer user dans la table Users
      if (response.data.error) {
        alert(response.data.error);
      } else {
        sessionStorage.setItem("accessToken", response.data);
      }
    });
  };
  const GetId = (username) => {
    axios
      .get(`http://localhost:3001/auth/getId/${username}`)
      .then((response) => (id = response.data.id));
  };

  const saveInfo = (id) => {
    const infoLabo = {
      laboratoire: laboratoire,
      username: username,
      summary: sommaire,
      full_name: full_name,
    };
    const contact = {
      UserId: id,
    };

    axios.post("http://localhost:3001/labos", infoLabo).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        sessionStorage.setItem("accessToken", response.data);
      }
    });
    axios.post("http://localhost:3001/contact", contact);
  };

  const wrapperSaver = () => {
    saveData();
    setTimeout(() => GetId(username), 200);
    setTimeout(() => saveInfo(id), 700);
    setTimeout(() => history.push("/GererLabos"), 900);
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <div className="login-container">
        <div className="login-form__header">
          Ajouter un utilisateur pour le nouveau membre
        </div>

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
        <label>Nom proposé au laboratoire</label>
        <input
          className="login-form__input"
          type="text"
          name="labo"
          placeholder="Nom proposé au laboratoire"
          onChange={(event) => {
            setLabo(event.target.value);
          }}
        />
        <label>Nom Complet du responsable</label>
        <input
          className="login-form__input"
          type="text"
          name="Name"
          placeholder="Nom complet du responsable"
          onChange={(event) => {
            setFullName(event.target.value);
          }}
        />
        <label>Sommaire et objectif du laboratoire</label>
        <input
          className="login-form__input"
          type="text"
          name="sommaire"
          placeholder="Sommaire et objectif du laboratoire"
          onChange={(event) => {
            setSummary(event.target.value);
          }}
        />
        <button
          className="login-form__button"
          type="submit"
          onClick={wrapperSaver}
        >
          Ajouter Laboratoire
        </button>
        <button
          className="login-form__button"
          type="submit"
          onClick={() => {
            history.push("/GererLabos");
          }}
        >
          Annuler
        </button>
      </div>
    </AuthContext.Provider>
  );
}

export default NewLabo;
