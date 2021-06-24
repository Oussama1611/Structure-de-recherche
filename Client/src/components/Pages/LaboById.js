import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import "../../App.css";

function Labo() {
  let { id } = useParams();
  const [laboName, setLaboName] = useState("");
  const [respoName, setRespoName] = useState("");
  const [respoUsername, setRespUsername] = useState("");
  const [respoId, setRespoId] = useState();
  const [listOfTeams, setListOfTeams] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:3001/labos/ById/${id}`).then((response) => {
      setLaboName(response.data.laboratoire);
      setRespoName(response.data.full_name);
      setRespUsername(response.data.username);
    });
  });
  //------------------------
  useEffect(() => {
    axios.get(`http://localhost:3001/teams/${id}`).then((response) => {
      setListOfTeams(response.data);
    });
  }, []);
  // Extraire le Id de respo
  let history = useHistory();
  function GetId() {
    axios
      .get(`http://localhost:3001/auth/getId/${respoUsername}`)
      .then((response) => {
        setRespoId(response.data.id);
      });
  }
  GetId();
  function push() {
    history.push(`/profil/${respoId}`);
  }

  return (
    <div className="labo-by-id">
      <div className="labo-title">
        <a className="labo-name">{laboName}</a>
      </div>
      <div className="labo-responsable">
        Responsable:
        <button className="labo-author" onClick={() => push()}>
          {respoName}
        </button>
      </div>

      <div className="labo-body">
        Les equipes :
        {listOfTeams.map((value, key) => {
          return (
            <Link to={`/equipes/${value.id}`}>
              <a className="labo-name">{value.team}</a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Labo;
