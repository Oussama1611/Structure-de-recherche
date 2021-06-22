import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import "../../App.css";


function GererLabos() {
  const [listOfLabos, setListOfLabos] = useState([]);
  const Ids = [];
  
  //------------------------------
  useEffect(() => {
    axios.get("http://localhost:3001/labos").then((response) => {
      setListOfLabos(response.data);
    });
  }, []);
  
  
  let history = useHistory();

  // extraction des Id des respo
  function GetId(username,index) {
    axios.get(`http://localhost:3001/auth/getId/${username}`)
    .then((response) => {
      Ids[index]=response.data.id;
    });
   }
  
  function push(j) {
    history.push(`/profil/${Ids[j]}`);
   };
   //------------------------------- supprimer un labo

    const supprimerLabo=(laboId) => {
      axios
      .delete(`http://localhost:3001/labos/${laboId}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      history.push("/profil/1");
  
    }

  return (
    <div>
      {listOfLabos.map((value, key) => {    
        GetId(value.username,key);
        return (
          <div className="labo">
            <div className="post-title">
              <Link to={`/laboratoires/${value.id}`}>
              <a className="labo-name" >{value.laboratoire}</a>
              </Link>  <br></br>
              <p style={{color:"purple"}}>Responsable:</p>
              <button className="post-author" onClick={() => push(key)}>{value.full_name}</button> 
              <div className="post-body">
                {value.summary}
              </div>
            </div>
            <button onClick={() => {supprimerLabo(value.id);} } className="login-form__button" type="submit">
               Supprimer le laboratoire
            </button>
          </div>
        );
      })}
      <div>
          <Link to="/NewLabo">
              <button className="new-post">Ajouter un Laboratoire</button>
          </Link>
      </div>
    </div>
  );
}

export default GererLabos;