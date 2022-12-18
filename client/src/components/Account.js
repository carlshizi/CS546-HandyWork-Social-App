import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { delete_cookie } from 'sfcookies'
import HandyManComponent from "./HandyManComponent";
import axios from "axios";

const Account = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [myPosts, setPosts] = useState([]);

  console.log("My posts: ", myPosts);
  console.log("Current user: ", currentUser);

  const API_URL = "http://localhost:5000/api/post/";
  const API_URL_USER = "http://localhost:5000/api/user/";

  // const responseUser = async () => {
  //   await axios
  //     .get(API_URL + `get/${currentUser.other._id}`)
  //     .catch((error) => console.log('Error: ', error));
  //   if (responseUser) {
  //       console.log("ResponseUser: ", responseUser);
  //       setPosts(responseUser.workPosts);
  //   }
  // }
  
  useEffect(() => {

    const getUserPosts = async () => {
      const responseUser = await axios
        .get(API_URL + `get/${currentUser.other._id}`)
        .catch((error) => console.log('Error: ', error));
      if (responseUser) {
          console.log("ResponseUser: ", responseUser);
          setPosts(responseUser.data.user.workPosts);
      }
    };

    getUserPosts();
  }, []);
  
  const cookie_key = "navigate"   // clear cookie for navigating to reset page
  delete_cookie(cookie_key);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  const removePost = async (post) => {
    console.log("Post to be removed: ", post);
    const id = currentUser.other._id;

    console.log("id: ", id);

    const response = await axios
        .put((API_URL + `remove/${id}`), {post: post})
        .catch((error) => console.log('Error: ', error));
    if (response) {
        console.log(response);
        setPosts(response.data.updatedUser.workPosts);
    }
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
        return <HandyManComponent key={post._id} handyMan={post} canDelete={true} removePost={removePost}/>
      })}
    </div>
  );
};

export default Account;
