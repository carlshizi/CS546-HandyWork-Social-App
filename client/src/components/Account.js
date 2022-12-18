import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { delete_cookie } from 'sfcookies'

const Account = () => {
  const cookie_key = "navigate"   // clear cookie for navigating to reset page
  delete_cookie(cookie_key)
  
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>Account & Settings</strong>
        </h3>
      </header>
    </div>
  );
};

export default Account;
