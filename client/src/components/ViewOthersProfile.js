import {React, useState, useEffect} from "react";
import {useSelector} from "react-redux";
import axios from "axios";

// Internal imports
import "./Profile.css";

const ViewOthersProfile = (
    username
) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [clickedUser, SetClickedUser] = useState({});

  const API_URL = "http://localhost:5000/api/user/";
  useEffect(() => {

    const getUser = async () => {
      const responseUser = await axios
        .get(API_URL + username.toLowerCase())
        .catch((error) => console.log('Error: ', error));
      if (responseUser.data) {
          console.log("ResponseUser: ", responseUser);
          SetClickedUser(responseUser.data);
      } 
    };
    getUser();
  }, []);

  return (
    <div className="startprofile-container">

     <div className="profile-canedit-content">
      <div className="profilepic-container">
        <img className="profilepic" src={clickedUser.image} 
        width="170" height="170" alt= "Profile Pic"/>
      </div>

      <p>
        <strong>Name:</strong> {clickedUser.profile.name}
      </p>

      <p>
        <strong>Available Handyman?</strong> {clickedUser.profile.handyman} 
      </p>

      <p>
        <strong>Skills:</strong> {clickedUser.profile.skills}
      </p>

      <p>
        <strong>Bio:</strong>
        <br/>
        {clickedUser.profile.bio}
      </p>

      </div> 

      <div className="profile-user-content">

        <p>
          <strong>Username:</strong> {currentUser.other.username}
        </p>

        <strong>Friends:</strong>
        <ul>{currentUser.other.Friends.map((role, index) => <li key={index}>{role}</li>)}</ul>
    
      </div>
  
    </div>
  );
}

export default ViewOthersProfile;