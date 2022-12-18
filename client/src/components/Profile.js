import {React} from "react";
import {Navigate} from 'react-router-dom';
import {useSelector} from "react-redux";


// Internal imports
import "./Profile.css";
import genericprofilepic from "./img/profilepic.jpg";

const Profile = ({
  stored, 
  startEditCallback
}) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  if (!currentUser) {
      return <Navigate to="/login" />;
    }

  return (
    <div className="startprofile-container">


     <div className="profile-canedit-content">
      <div className="profilepic-container">
        <img class="profilepic" src={genericprofilepic} width="170" height="170" alt= "Profile Pic"/>
      </div>

      <p>
        <strong>Name:</strong> {stored.name}
      </p>

      <p>
        <strong>Available Handyman?</strong> {stored.handyman} 
      </p>

      <p>
        <strong>Skills:</strong> {stored.skills}
      </p>

      <p>
        <strong>Bio:</strong> {stored.bio}
      </p>

      <p>
        <strong>Experiences:</strong> {stored.experience}
      </p>

      <p>
        <button 
          class="profile-btn"
          onClick={startEditCallback}
          >
            Edit Profile</button>
      </p>

      </div> 

      <div class="profile-user-content">

        <p>
          <strong>Username:</strong> {currentUser.other.username}
        </p>

        <strong>Friends:</strong>
        <ul>{currentUser.other.Friends.map((role, index) => <li key={index}>{role}</li>)}</ul>

      </div>
  
    </div>
  );
}

export default Profile;

