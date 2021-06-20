import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./ForgotPassword.css";
import { AuthContext } from "../../helpers/AuthContext";
import FormData from "form-data";


function NewPost () {

    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [post, setPost] = useState("");;
    const [id,setId] = useState("");

    //------------------------------
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
          }
        });
    }, []);
    //-------------------------------
    let history = useHistory();
    const saveData = ()=>{
    const data = {
      title :title,
      post:post,
      type : "Pdf",
      UserId : id

    };
    axios.post("http://localhost:3001/posts", data).then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          sessionStorage.setItem("accessToken", response.data);
        }
      });
  }
    //----------------------------- file uploading ...

    const Upload_file =(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file',file);
        const config ={
        headers:{
            'content-type':'multipart/form-data',
            'id': 'id',
            'title':title
        },
        };
        axios.post("http://localhost:3001/user/upload-file",formData,config)
        .then((response)=>
        {
        console.log(response);
        })
        .catch((err) => {
        console.log('err',err);
        })
        history.push(`/profil/${id}`);
    };
  
    const onInputChange = (e) => {
      setFile(e.target.files[0])
    }
    //-------------------- fonction assemblante
    const wrapperfunc = (e)=>{
      saveData(e);
      Upload_file(e);
    }

    return (
        <AuthContext.Provider value={{ authState, setAuthState }}>
        <div className="login-container">
          <div className="login-form__header">Modifier vos informations</div>
      
          <label>Titre de Publication</label>
          <input
            className="login-form__input"
            type="text"
            name="pub"
            placeholder="Titre"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <label>Commentaire</label>
          <input
            className="login-form__input"
            type="text"
            name="commentaire"
            placeholder="Résumé"
            onChange={(event) => {
              setPost(event.target.value);
            }}
          />
         <label>Fichier du support </label>
          <form  >
          <input className="login-form__input" type="file" name="file"     
          onChange={onInputChange}
          />
          </form>

          <button className="login-form__button" type="submit"
          onClick={wrapperfunc} >
            Publier
          </button>
          <button
              className="login-form__button"
              type="submit"
              onClick={() => {
                history.push(`/PostById/${id}`);
              }}
            >
              Annuler
            </button>
        </div>
        </AuthContext.Provider>
      );
}


export default NewPost;