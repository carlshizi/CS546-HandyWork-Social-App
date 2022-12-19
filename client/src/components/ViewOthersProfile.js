import React, { useState, useEffect } from "react";
import axios from "axios"
import { Navigate } from 'react-router-dom'
import { useParams } from 'react-router';
import { useSelector } from "react-redux";

// Internal imports
import "./Profile.css";

const ViewOthersProfile = () => {

  const { user: currentUser } = useSelector((state) => state.auth);
  const [info, getInfo] = useState('');
  const { username } = useParams();

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


  const getUser = async () => {

    await axios.get(`http://localhost:5000/api/user/${username}`)
      .then((response) => {
        const allUsers = response.data;
        getInfo(allUsers);
      })
    // if(!info){
    //   return <Navigate to="/profile" />;
    // }
    //   console.log(userInfo.data.username)

  }

  if (!currentUser) {
    return <Navigate to="/login" />;
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

          <p>
            {/* <strong>Name:</strong> {clickedUser.profile.name} */}
          </p>

          <p>
            {/* <strong>Available Handyman?</strong> {clickedUser.profile.handyman} */}
          </p>

          <p>
            {/* <strong>Skills:</strong> {clickedUser.profile.skills} */}
          </p>

          <p>
            <strong>Bio:</strong>
            <br />
            {/* {clickedUser.profile.bio} */}
          </p>

        </div>

        <div className="profile-user-content">

          <p>
            {/* <strong>Username:</strong> {currentUser.other.username} */}
          </p>

          <strong>Friends:</strong>
          <ul>{info.Friends.map((role, index) => <li key={index}>{role}</li>)}</ul>

        </div>

      </div>
      )
      : (<h1 className="regError3">User does not exist</h1>)
  )
}

export default ViewOthersProfile;