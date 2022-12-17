import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      
      <header className="jumbotron">
        <h3>
          <strong>Profile</strong>
        </h3>
      </header>

      <p>
        <strong>Username:</strong> {currentUser.other.username}
      </p>

      <p>
        <strong>Email:</strong> {currentUser.other.email}
      </p>

      <strong>Friends:</strong>
      <ul>{currentUser.other.Friends.map((role, index) => <li key={index}>{role}</li>)}</ul>

    </div>
  );
};

export default Profile;

