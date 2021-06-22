import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../App.css";


function Home() {
    const [listOfPosts, setListOfPosts] = useState([]);
  
    useEffect(() => {
      axios.get("http://localhost:3001/posts").then((response) => {
        setListOfPosts(response.data);
      });
    }, []);
  


return (
<div>
    {listOfPosts.map((value, key) => {
        return (
    <div className="post">
        
        <div className="post-title">{value.title}</div>
        <div className="post-body">{value.post}</div>
        <div >
            <p>
            <span>
                <a className="post-author" href={`http://localhost:3000/profil/${value.UserId}`}>L'auteur</a>
            </span>
            </p>
        </div>
        <div> {value.createdAt}</div>
        <div>
        <a href={value.supportfile_path}>
        <button className="login-form__button" type="submit">
         Voir la publication
        </button>
    </a>
    </div>
    </div>
     );
    })}
</div>

)}


export default Home;