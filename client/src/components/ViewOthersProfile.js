import {React, useEffect, useState} from "react";
import { useParams } from 'react-router';
import axios from "axios";

// Internal imports
import "./Profile.css";
import genericprofilepic from "./img/profilepic.jpg";

const ViewOthersProfile = (
) => {
  const [ otherUser, getOther] = useState('');
  const [ hide, setHide] = useState(false);
  const [ profile, setProfile] = useState({});
  const [image, setImage] = useState("");
  let { username } = useParams();


  username = username.toLowerCase();
  const API_URL = `http://localhost:5000/api/user/${username}`; 

  useEffect(() => {

    const getUser = async () => {
      const responseUser = await axios
        .get(API_URL)
        .catch((error) => console.log('Error: ', error));
    if (responseUser) {
        console.log("ResponseUser: ", responseUser);
        getOther(responseUser.data);
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

    };

    getUser();
  }, []); 


  return (
    <div className="startprofile-container">

     <div className="canhide-container">
      <div className="profilepic-container">
        <img className="profilepic" src={image} 
        width="170" height="170" alt= "Profile Pic"/>
      </div>
    </div>

    <div className="canhide-container">
        { hide ? (
            <div>
                <p>
                <strong id="hiddenProfile">{otherUser.username} has not set up their profile bio</strong> 
                </p>
            </div>
        ) : (
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
        <br/>
        {profile.bio}
        </p>
        </div>
        )}
      </div> 


      <div className="profile-user-content">

        <p>
          <strong>Username:</strong> {otherUser.username}
        </p>

      </div>

  
    </div>
  );
}

export default ViewOthersProfile;