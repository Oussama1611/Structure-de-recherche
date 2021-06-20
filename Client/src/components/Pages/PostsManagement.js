import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../App.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function PostById() {
    const [authState, setAuthState] = useState(false);
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [listOfPosts, setListOfPosts] = useState([]);
  
    //------------------------
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
    });
    //------------------
    useEffect(() => {
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
          setListOfPosts(response.data);
        });
      },[id]);
    //------------------- supp de post
    let history = useHistory();
    const supprimerPost=(PostId) => {
      axios
      .delete(`http://localhost:3001/posts/${PostId}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      history.push(`/profil/${id}`);
  
    }

return (
  <div>
  <div>
   
     <h2 style={{margin: "10px 500px "}}>Vous avez {listOfPosts.length} publication(s)</h2>
  
   </div>
  <div>
    {listOfPosts.map((value, key) => {
        return (
    <div className="post">
        <div className="post-title">{value.title}</div>
        <div className="post-body">{value.post}</div>
        <div >
            <p>Auteur:
            <span>
                <a className="post-author" href={`http://localhost:3000/profil/${value.UserId}`}>Moi</a>
            </span>
            </p>
        </div>
        <div>
        <a href={value.supportfile_path}>
        <button className="login-form__button" type="submit">
         Voir la publication
        </button>
        </a>
        <button onClick={() => {supprimerPost(value.id);} } className="login-form__button" type="submit">
          Supprimer la publication
        </button>
        
    </div>
    </div>
     );
    })
    }
</div>
   <Link to="/new-post">
     <button className="new-post">
       Nouvelle Publication
     </button>
   </Link>
</div>
)}


export default PostById;