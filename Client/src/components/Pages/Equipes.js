import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import "../../App.css";

function Equipes() {
  const [listOfTeams, setListOfTeams] = useState([]);
  const Ids = [];

  useEffect(() => {
    axios.get("http://localhost:3001/teams").then((response) => {
      setListOfTeams(response.data);
    });
  }, []);

  // extraire les Ids des respo
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
              Responsable
              <button className="labo-author" onClick={() => push(key)}>
                {value.full_name}
              </button>
            </div>
            <div className="labo-body">{value.summary}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Equipes;
