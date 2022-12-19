import {React} from "react";
import {useSelector} from "react-redux";

// Internal imports
import "./Profile.css";

const Profile = ({
  stored, 
  image,
  startEditCallback
}) => {
  const { user: currentUser } = useSelector((state) => state.auth);

  return (
    <div className="startprofile-container">

     <div className="profile-canedit-content">
      <div className="profilepic-container">
        <img className="profilepic" src={image} 
        width="170" height="170" alt= "Profile Pic"/>
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
        <strong>Bio:</strong>
        <br/>
        {stored.bio}
      </p>

      <p>
        <button 
          className="profile-btn"
          onClick={startEditCallback}
          >
            Edit Profile</button>
      </p>

      </div> 

      <div className="profile-user-content">

        <p>
          <strong>Username:</strong> {currentUser.other.username}
        </p>

        <strong>Friends (Following):</strong>
        <ul>{currentUser.other.Following.map((role, index) => <li key={index}>{role}</li>)}</ul>

        <strong>Friends (Followers):</strong>
        <ul>{currentUser.other.Followers.map((role, index) => <li key={index}>{role}</li>)}</ul>    
      </div>
  
    </div>
  );
}

export default Profile;

