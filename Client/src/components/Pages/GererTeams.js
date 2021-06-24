import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import "../../App.css";

function GererTeams() {
  const { idLabo } = useParams();
  const [listOfTeams, setListOfTeams] = useState([]);
  const Ids = [];

  useEffect(() => {
    axios.get(`http://localhost:3001/teams/${idLabo}`).then((response) => {
      setListOfTeams(response.data);
    });
  }, []);
  // extraction des Ids des respo
  let history = useHistory();
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
  //------------------------------- supprimer une equipe

  const supprimerTeam = (teamId) => {
    axios.delete(`http://localhost:3001/teams/${teamId}`, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    });
    history.push(`/GererTeams/${idLabo}`);
  };

  return (
    <div>
      {listOfTeams.map((value, key) => {
        GetId(value.username, key);
        return (
          <div className="labo">
            <div className="labo-title">
              <Link to={`/equipes/${value.id}`}>
                <a className="labo-name">{value.team}</a>
              </Link>
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
                supprimerTeam(value.id);
              }}
              className="login-form__button"
              type="submit"
            >
              Supprimer l'équipe
            </button>
          </div>
        );
      })}
      <div className="login-container">
        <Link to={`/NewTeam/${idLabo}`}>
          <button className="login-form__button">Ajouter une equipe</button>
        </Link>
      </div>
    </div>
  );
}

export default GererTeams;
