import React, { useState, useEffect } from "react";
import axios from "axios"
import { Navigate } from 'react-router-dom'
import { useParams } from 'react-router';
import { useSelector } from "react-redux";

// const loopArray = (arr) => {
//   for(let i = 0; i < arr.length; ++i){
//     return<ul>
//       <li key={i}>{arr.Friends[i]}</li>
//     </ul>
//   }

// }

const User = () => {

  const { user: currentUser } = useSelector((state) => state.auth);
  const [ info, getInfo ] = useState('');
  const { username } = useParams();

  useEffect(() => {
    getUser();
  }, []);

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


  // console.log(info)
  return (
    info ?
    (<div className="container">
      <header className="jumbotron">
        <h3>
          <strong>User</strong>
        </h3>
      </header>

      <p>
        <strong>Username:</strong> { info.username }
      </p>

      <p>
        <strong>Email:</strong> {info.email}
      </p>

      <strong>Friends:</strong>
      <ul>{info.Friends?.map((role, index) => <li key={index}>{role}</li>)}</ul>

    </div>)
    : (<h1 className="regError3">User does not exist</h1>)
  );
};

export default User;
