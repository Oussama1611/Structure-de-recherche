import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../../App.css";


function Equipes() {
  const [listOfTeams, setListOfTeams] = useState([]);
  const [id, setId] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/teams").then((response) => {
      setListOfTeams(response.data);
    });
  }, []);
  let history = useHistory();
  const GetId = (username) => {
    axios.get(`http://localhost:3001/auth/getId/${username}`)
    .then((response) => {
      setId(response.data.id);
    });
  }
  const push = (()=>{
    history.push(`/profil/${id}`);
  })
  return (
    <div>
      {listOfTeams.map((value, key) => {
        return (
          <div className="labo">
            <div className="post-title">
             {GetId(value.username)}
              <p className="labo-name">{value.team}</p>
                <button className="labo-responsable" onClick={() => push()}>Le responsable</button> 
            </div>
            <div>
            <p1 className="labo-body">Les membres de l'équipe:</p1>
            <p2 className="labo-body"> hello</p2>
            <p2 className="labo-body">hey</p2>
            <p2 className="labo-body">Salut</p2>
            <p2 className="labo-body">Hola</p2>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Equipes;
