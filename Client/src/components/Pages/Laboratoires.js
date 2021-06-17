import axios from "axios";
import React, { useEffect, useState } from "react";

function Laboratoires() {
  const [listOfLabos, setListOfLabos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/labos").then((response) => {
      setListOfLabos(response.data);
    });
  }, []);
  return (
    <div>
      {listOfLabos.map((value, key) => {
        return (
          <div className="labo">
            <div className="post-title">
              <p className="labo-name">{value.laboratoire}</p>
              <p className="labo-responsable">
                {" "}
                Responsable : {value.username}
              </p>
            </div>
            <div className="labo-body">Labo members</div>
          </div>
        );
      })}
    </div>
  );
}

export default Laboratoires;
