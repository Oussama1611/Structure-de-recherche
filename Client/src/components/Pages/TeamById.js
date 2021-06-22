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
      setNameRespo(response.data.full_name);    // retreive the username of respo
    });
  });

  //------------------------ 
  
  return (
         <div className="labo">
            <div className="post-title">
              L'equipe :
              <p className="post-title" >{teamName}</p>
              Responsable:
              <p className="post-title" > {nameRespo}</p>
              Les membres :
              <div className="post-body">
                {listOfMembres.map((value, key) =>{
                    return (
                    <Link to={`/profil/${value.id}`}>
                      <a className="labo-name" >{value.full_name}</a>
                    </Link> 
                )
                })
                }
              </div>
            </div>
            
          </div>
  )
}

export default Team;