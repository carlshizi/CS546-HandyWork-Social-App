import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const Home = () => {

  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>Home</strong>
        </h3>
      </header>
    </div>
  );
};

export default Home;
