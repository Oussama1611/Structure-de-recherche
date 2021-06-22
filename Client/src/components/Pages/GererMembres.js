import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import "../../App.css";


function GererMembres() {
  const { idTeam } = useParams();
  const [listOfMembers, setListOfMembers] = useState([]);
  const Ids = [];

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/${idTeam}`).then((response) => {
        setListOfMembers(response.data);
    });
  }, []);
  
   //------------------------------- supprimer un membre
    let history =useHistory();
    const supprimerUser=(UserId) => {
      axios
      .delete(`http://localhost:3001/auth/${UserId}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      history.push(`/GererMembres/${idTeam}`);
    }
  return (
    <div>
    <h2 style={{textAlign:"center"}}>Les membres de mon equipe sont :</h2>
      {listOfMembers.map((value, key) => {    
        return (
            <> 
          
                <h3 style={{textAlign:"center"}}>
                <Link to={`/profil/${value.id}`}>{value.full_name}</Link>
                </h3>
           
            <button onClick={() => {supprimerUser(value.id);} } className="new-post" type="submit">
               Supprimer le membre
            </button>
            </>
        )})}
        <div style={{marginTop:"20px"}}>
          <Link to={`/NewMembre/${idTeam}`}>
              <button className="new-post">Ajouter un Membre</button>
          </Link>
      </div>
    </div>
  );
}

export default GererMembres;