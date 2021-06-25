import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../../App.css";

function Team() {
  let { id } = useParams();
  const [teamName, setTeamName] = useState("");
  const [listOfMembres, setListOfMembres] = useState([]);
  const [nameRespo, setNameRespo] = useState("");
  //----------------
  useEffect(() => {
    axios.get(`http://localhost:3001/auth/${id}`).then((response) => {
      setListOfMembres(response.data);
    });
  }, []);
  //-------------------
  useEffect(() => {
    axios.get(`http://localhost:3001/teams/user/${id}`).then((response) => {
      setTeamName(response.data.team);
      setNameRespo(response.data.full_name); // retreive the username of respo
    });
  });

  //------------------------

  return (
    <div className="labo-by-id">
      <div className="labo-title">L'équipe : {teamName}</div>
      <div className="labo-responsable">
        Responsable:
        {nameRespo}
      </div>

      <div className="labo-body">
        Les membres :
        {listOfMembres.map((value, key) => {
          return (
            <Link to={`/profil/${value.id}`}>
              <a >{value.full_name}</a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Team;
