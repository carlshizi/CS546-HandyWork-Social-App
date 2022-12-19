import React, { useState, useEffect } from "react";
import axios from "axios"
import { Navigate } from 'react-router-dom'
import { useParams } from 'react-router';
import { useSelector } from "react-redux";

// Internal imports
import "./Profile.css";
import genericprofilepic from "./img/profilepic.jpg";

const ViewOthersProfile = () => {

  const { user: currentUser } = useSelector((state) => state.auth);
  const [info, getInfo] = useState('');
  const { username } = useParams();
  const [ hide, setHide] = useState(false);
  const [ profile, setProfile] = useState({});
  const [image, setImage] = useState("");

  useEffect(() => {
    getUser();
  }, []);
  // http://localhost:5000/api/user/follow/639e39d27d7c4e8b0baa690b?user=639e39d27d7c4e8b0baa690a

  const addFriend = async() =>{
    try {
      await axios.put(`http://localhost:5000/api/user/follow/${currentUser.other._id}`, {"user": info._id});
    } catch (error) {
      console.log(error)
    }
    
  }

  const API_URL = `http://localhost:5000/api/user/${username}`; 
  const getUser = async () => {

    const responseUser = await axios
    .get(API_URL)
    .catch((error) => console.log('Error: ', error));
    if (responseUser) {
        console.log("ResponseUser: ", responseUser);
        getInfo(responseUser.data);
    }
    if(responseUser.data.profile) {
        setHide(false); 
        setProfile(responseUser.data.profile);
    } else {
        setHide(true);
        const initial = { 
            name: "firstname lastname", 
            handyman: "No", 
            skills:"List out some skills you have", 
            bio:"Tell us about yourself"
        };
        setProfile(initial);
    }
    if(responseUser.data.image) {
        setImage(responseUser.data.image);
    } else {
        setImage(genericprofilepic);
    }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  }
// console.log(info._id)
// console.log(currentUser.other._id)
// genericprofilepic

  return (
    info ?
      (<div className="startprofile-container">

        <div className="profile-canedit-content">
          <div className="profilepic-container">
            <img className="profilepic" src={info.image}
              width="170" height="170" alt="Profile Pic" />
              <button className="button9" style={{marginLeft:"50px", marginBottom:"10px"}} onClick={addFriend}>Add</button>
          </div>
        
        { hide ? (
            <div>           
            <p>
                <strong>{info.username} has not set up their profile bio</strong> 
            </p>
          </div>
        ): (
        
        <div>
          <p>
            <strong>Name:</strong> {profile.name} 
          </p>

          <p>
            <strong>Available Handyman?</strong> {profile.handyman} 
          </p>

          <p>
            <strong>Skills:</strong> {profile.skills} 
          </p>

          <p>
            <strong>Bio:</strong>
            <br />
                {profile.bio} 
          </p>

        </div>
        )}
        </div>
        
        <div className="profile-user-content">

          <p>
            <strong>Username:</strong> {info.username} 
          </p>

          <strong>Friends (Following):</strong>
          <ul>{info.Following.map((role, index) => <li key={index}>{role}</li>)}</ul>

          <strong>Friends (Followers):</strong>
          <ul>{info.Followers.map((role, index) => <li key={index}>{role}</li>)}</ul>
        </div>

      </div>
      )
      : (<h1 className="regError3">User does not exist</h1>)
  )
}

export default ViewOthersProfile;