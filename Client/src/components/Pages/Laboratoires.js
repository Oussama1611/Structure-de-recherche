import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import "../../App.css";


function Laboratoires() {
  const [listOfLabos, setListOfLabos] = useState([]);
  const [id, setId] = useState("");
 
  useEffect(() => {
    axios.get("http://localhost:3001/labos").then((response) => {
      setListOfLabos(response.data);
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
  //------------------------
  

  return (
    <div>
      {listOfLabos.map((value, key) => {
        return (
          <div className="labo">
            <div className="post-title">
             {GetId(value.username)}
              <Link to="/">
              <p className="labo-name" >{value.laboratoire}</p>
              </Link>
              <button className="post-author" onClick={() => push()}>Le responsable</button> 
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
