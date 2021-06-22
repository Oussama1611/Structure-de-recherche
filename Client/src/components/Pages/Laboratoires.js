import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import "../../App.css";


function Laboratoires() {
  const [listOfLabos, setListOfLabos] = useState([]);
  const Ids = [];
  
  useEffect(() => {
    axios.get("http://localhost:3001/labos").then((response) => {
      setListOfLabos(response.data);
    });
  }, []);
  let history = useHistory();

  // Extraire les Ids des respo
  function GetId(username,index) {
    axios.get(`http://localhost:3001/auth/getId/${username}`)
    .then((response) => {
      Ids[index]=response.data.id;
    });
  }
  function push(j) {
    history.push(`/profil/${Ids[j]}`);
   };

  return (
    <div>
      {listOfLabos.map((value, key) => {    
        GetId(value.username,key);
        return (
          <div className="labo">
            <div className="post-title">
              <Link to={`/laboratoires/${value.id}`}>
              <a className="labo-name" >{value.laboratoire}</a>
              </Link>  
              Responsable:
              <button className="post-author" onClick={() => push(key)}>{value.full_name}</button> 
              <div className="post-body">
                {value.summary}
              </div>
            </div>
            
          </div>
        );
      })}
    </div>
  );
}

export default Laboratoires;
