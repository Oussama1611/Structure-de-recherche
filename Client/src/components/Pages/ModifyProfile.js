import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./ForgotPassword.css";
import { AuthContext } from "../../helpers/AuthContext";
import FormData from "form-data";

function ModifyProfile() {
  const [picture, setPicture] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [numberPhone, setNumberPhone] = useState("");
  const [bio, setBio] = useState("");
  const [site, setSite] = useState("");
  const [id,setId] = useState("");
  const [username, setUsername]= useState("");

  //-------------------------------
  const [authState, setAuthState] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/tokenValidating", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState(false);
        } else {
          setAuthState(true);
          setId(response.data.id);
          setUsername(response.data.username)
        }
      });
  }, []);
  //-------------------------------
  let history = useHistory();
  const saveData = ()=>{
    const data = {
      
      full_name : fullName,
      email : email,
      numberphone : numberPhone,
      bio : bio,
      username :username,
      site_personnel :site,
      UserId :id
      
    };

    axios.post(`http://localhost:3001/contact/changeProfilData/${id}`, data).then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          sessionStorage.setItem("accessToken", response.data);
          history.push(`/profil/${id}`);
        }
      });
  }
  //----------------------------- pic uploading ...

  const Upload_pic =(e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('photo',picture);
  const config ={
    headers:{
      'content-type':'multipart/form-data',
      'id': 'id'
    },
  };
  axios.post(`http://localhost:3001/user/change-pic/${id}`,formData,config)
  .then((response)=>
  {
    console.log(response);
  })
  .catch((err) => {
    console.log('err',err);
  })

};

  const onInputChange = (e) => {
    setPicture(e.target.files[0])
  }
  //-------------------- fonction assemblante
  const wrapperfunc = (e)=>{
    saveData(e);
    Upload_pic(e);
  }

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
    <div className="login-container">
      <div className="login-form__header">Modifier vos informations</div>

      <label>Photo de profile</label>
      <form  >
      <input className="login-form__input" type="file" name="photo"     
      onChange={onInputChange}
      />
  
       </form>
      <label>Nom et Prénom</label>
      <input
        className="login-form__input"
        type="text"
        autoComplete="off"
        name="fullname"
        placeholder="Nom et Prénom"
        onChange={(event) => {
          setFullName(event.target.value);
        }}
      />
      <label>Adresse email</label>
      <input
        className="login-form__input"
        type="email"
        autoComplete="off"
        name="email"
        placeholder="Email"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <label>Numéro de téléphone</label>
      <input
        className="login-form__input"
        type="text"
        name="numberPhone"
        autoComplete="off"
        placeholder="Numéro de telephone"
        onChange={(event) => {
          setNumberPhone(event.target.value);
        }}
      />
      <label>Bio</label>
      <input
        className="login-form__input"
        type="text"
        name="bio"
        autoComplete="off"
        placeholder="Biographie (Ex: Professeur..)"
        onChange={(event) => {
          setBio(event.target.value);
        }}
      />
      <label>Site Personnel</label>
      <input
        className="login-form__input"
        type="text"
        name="Site"
        autoComplete="off"
        placeholder="Site web personnel"
        onChange={(event) => {
          setSite(event.target.value);
        }}
      />
      <button className="login-form__button" type="submit"
      onClick={wrapperfunc}
      >
        Enregistrer
      </button>
      <button
          className="login-form__button"
          type="submit"
          onClick={() => {
            history.push(`/profil/${id}`);
          }}
        >
          Annuler
        </button>
    </div>
    </AuthContext.Provider>
  );
}

export default ModifyProfile;
