import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Card from "../Card";
import { Button } from "../Button";

function Profile() {
  let { id } = useParams();
  const [username, setUsername] = useState("");
  const [photo_path, setPhoto] = useState("");
  const [full_name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [numberphone, setNumberPhone] = useState("");
  const [site_personnel, setSite]= useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/contact/profil/${id}`)
      .then((response) => {
        setUsername(response.data.username);
        setName(response.data.full_name);
        setPhoto(response.data.photo_path);
        setEmail(response.data.email);
        setNumberPhone(response.data.numberphone);
        setSite(response.data.site_personnel);
      });
  }, []); 
  
  return (
    <div>
      <Card
        name={full_name}
        
        
        tel={numberphone}
        email={email}
        site={site_personnel}

      />
    </div>
  );
}

export default Profile;
