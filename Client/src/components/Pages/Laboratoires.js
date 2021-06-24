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
  function GetId(username, index) {
    axios
      .get(`http://localhost:3001/auth/getId/${username}`)
      .then((response) => {
        Ids[index] = response.data.id;
      });
  }
  function push(j) {
    history.push(`/profil/${Ids[j]}`);
  }

  return (
    <div>
      {listOfLabos.map((value, key) => {
        GetId(value.username, key);
        return (
          <div className="labo">
            <div className="labo-title">
              <Link to={`/laboratoires/${value.id}`}>
                <a className="labo-name">{value.laboratoire}</a>
              </Link>
            </div>
            <div className="labo-body">{value.summary}</div>
            <div className="labo-responsable">
              Responsable:
              <button className="labo-author" onClick={() => push(key)}>
                {value.full_name}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Laboratoires;
