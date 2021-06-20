import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../App.css";


function Labo() {
  
  let { id } = useParams();
  const [laboName, setLaboName] = useState();
  const [listOfTeams, setListOfTeams] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:3001/labos/${id}`).then((response) => {
      setLaboName(response.data.laboratoire);
    });
  }, []);
  //------------------------
  useEffect(() => {
    axios.get(`http://localhost:3001/teams/${id}`).then((response) => {
      setListOfTeams(response.data);
    });
  }, []);


  return (
    <div>
         <div className="labo">
            <div className="post-title">
              <a className="post-title" >{laboName}</a>
              Les equipes :
              <div className="post-body">
                {listOfTeams.map((value, key) =>{
                    return (
                    <a href={`http://localhost:3000/equipe/${value.id}`}> {value.team}</a>
                );
                })
                }
              </div>
            </div>
            
          </div>

    </div>
  )
}

export default Labo;
