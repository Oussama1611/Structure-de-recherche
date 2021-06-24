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
  let history = useHistory();
  const supprimerUser = (UserId) => {
    axios.delete(`http://localhost:3001/auth/${UserId}`, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    });
    history.push(`/GererMembres/${idTeam}`);
  };
  return (
    <div>
      <div className="labo-by-id">
        <div className="login-form__header">
          Les membres de mon équipe sont:
        </div>
        {listOfMembers.map((value, key) => {
          return (
            <>
              <div className="labo-body">
                <Link to={`/profil/${value.id}`}>{value.full_name}</Link>
              </div>
              <div>
                <button
                  onClick={() => {
                    supprimerUser(value.id);
                  }}
                  className="login-form__button"
                  type="submit"
                >
                  Supprimer le membre
                </button>
              </div>
            </>
          );
        })}
      </div>
      <div>
        <Link to={`/NewMembre/${idTeam}`}>
          <button className="new-post">Ajouter un Membre</button>
        </Link>
      </div>
    </div>
  );
}

export default GererMembres;
