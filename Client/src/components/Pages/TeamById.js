import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "../../App.css";


function Team() {
  
  let { id } = useParams();
  const [teamName, setTeamName] = useState();
  const [listOfMembers, setListOfMembers] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:3001/team/${id}`).then((response) => {
      setTeamName(response.data.team);
    });
  }, []);
  //------------------------
  useEffect(() => {
    axios.get(`http://localhost:3001/auth/${id}`).then((response) => {
      setListOfMembers(response.data);
    });
  },[id])

  return (
    <div>
         <div className="labo">
            <div className="post-title">
              <a className="post-title" >{teamName}</a>
              Les membres :
              <div className="post-body">
                {listOfMembers.map((value, key) =>{
                    return (
                    <a href={`http://localhost:3000/profil/${value.id}`}> {value.username}</a>
                );
                })
                }
              </div>
            </div>
            
          </div>

    </div>
  )
}

export default Team;