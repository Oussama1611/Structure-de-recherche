import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "../Card";
import "../Card.css";

function Profile() {
  let { id } = useParams();
  const [photo_path, setPhoto] = useState("");
  const [full_name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [numberphone, setNumberPhone] = useState("");
  const [site_personnel, setSite] = useState("");
  const [bio, setBio] = useState("");
  const [user_id, setId] = useState();

  useEffect(() => {
    axios.get(`http://localhost:3001/contact/profil/${id}`).then((response) => {
      setName(response.data.full_name);
      setPhoto(response.data.photo_path);
      setEmail(response.data.email);
      setNumberPhone(response.data.numberphone);
      setSite(response.data.site_personnel);
      setBio(response.data.bio);
      setId(response.data.UserId);
    });
  }, []);
  //-----------------------------

  return (
    <div>
      <Card
        name={full_name}
        img={photo_path}
        tel={numberphone}
        email={email}
        site={site_personnel}
        bio={bio}
        id={user_id}
      />
    </div>
  );
}

export default Profile;
