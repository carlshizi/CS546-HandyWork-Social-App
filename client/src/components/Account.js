import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { delete_cookie } from 'sfcookies'
import HandyManComponent from "./HandyManComponent";

const Account = () => {
  const cookie_key = "navigate"   // clear cookie for navigating to reset page
  delete_cookie(cookie_key)
  
  const { user: currentUser } = useSelector((state) => state.auth);

  let myPosts = currentUser.other.workPosts;
  console.log("My posts: ", myPosts);

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
      <div className="myPostsNum">{`My total post count: ${myPosts.length}`}</div>
      {myPosts.map(post => {
        return <HandyManComponent key={post._id} handyMan={post} canDelete={true}/>
      })}
    </div>
  );
};

export default Account;
