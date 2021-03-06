import React, { useEffect, useState } from 'react'
import {addDoc, collection} from "firebase/firestore" //addDoc is a function that alllows us to enter the document in the table in db
import {db, auth} from "../firebase-config";
import {useNavigate} from "react-router-dom";
function CreatePost({isAuth}) {
const [title,setTitle] =useState("");
const [postText, setPostText] =useState("");
let navigate=useNavigate();
const postsCollectionRef = collection(db,"posts");
const createPost =async()=>{
   await addDoc(postsCollectionRef,
    {title,
        postText,
        author:{name: auth.currentUser.displayName,id:auth.currentUser.uid}});
   navigate("/");
}
useEffect(()=>{
if(!isAuth) {
navigate("/login");
}
},[])

  return (
    <div className="createPostPage">
        <div className="cpContainer">
            <h1 className="create-post-head">Create a Post</h1>
            <div className="inputGp">
                <label className="label-create-post">Title:</label>
                <input placeholder="Title..." 
                onChange={(event)=>{setTitle(event.target.value)}} 

                />
            </div>
            <div className="inputGp">
                <label className="label-create-post">Post:</label>
                <textarea placeholder="Post..." 
                onChange={(event)=>{setPostText(event.target.value)}} 

                />
            </div>
            <button onClick={createPost}>Submit Post</button>
        </div>
    </div>
  )
}

export default CreatePost