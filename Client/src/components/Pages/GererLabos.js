import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import "../../App.css";

function GererLabos() {
  const [listOfLabos, setListOfLabos] = useState([]);
  const Ids = [];

  //------------------------------
  useEffect(() => {
    axios.get("http://localhost:3001/labos").then((response) => {
      setListOfLabos(response.data);
    });
  }, []);

  let history = useHistory();

  // extraction des Id des respo
  function GetId(username, index) {
    axios
      .get(`http://localhost:3001/auth/getId/${username}`)
      .then((response) => {
        Ids[index] = response.data.id;
      });
  }

  function push(j) {
    history.push(`/profil/${Ids[j]}`);
  }
  //------------------------------- supprimer un labo

  const supprimerLabo = (laboId) => {
    axios.delete(`http://localhost:3001/labos/${laboId}`, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    });
    history.push("/profil/1");
  };

  return (
    <div>
      {listOfLabos.map((value, key) => {
        GetId(value.username, key);
        return (
          <div className="labo">
            <div className="labo-title">
              <Link to={`/laboratoires/${value.id}`}>
                <a className="labo-name">{value.laboratoire}</a>
              </Link>{" "}
              <br />
            </div>
            <div className="labo-responsable">
              Responsable:
              <button className="labo-author" onClick={() => push(key)}>
                {value.full_name}
              </button>
            </div>

            <div className="labo-body">{value.summary}</div>
            <button
              onClick={() => {
                supprimerLabo(value.id);
              }}
              className="login-form__button"
              type="submit"
            >
              Supprimer le laboratoire
            </button>
          </div>
        );
      })}
      <div className="login-container">
        <Link to="/NewLabo">
          <button className="login-form__button">Ajouter un Laboratoire</button>
        </Link>
      </div>
    </div>
  );
}

export default GererLabos;
