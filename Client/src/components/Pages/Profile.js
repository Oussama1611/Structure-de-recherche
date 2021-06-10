import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Profile.css";
import axios from "axios";

function Profile() {
  let { id } = useParams();
  const [username, setUsername] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/auth/information/${id}`)
      .then((response) => {
        setUsername(response.data.username);
      });
  }, []);
  return (
    <div className="profile_container">
      <div className=".user_information">
        <h1>Nom d'utilisateur : {id}</h1>
      </div>
    </div>
  );
}

export default Profile;
