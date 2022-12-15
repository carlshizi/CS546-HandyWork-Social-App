import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import logo from './components/img/Handywork2ii.png'

import "bootstrap/dist/css/bootstrap.min.css";
import "./components/Login.css"
import "./App.css";
// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/js/bootstrap.js';
// import $ from 'jquery';
// import Popper from 'popper.js';


import Login from "./components/Login";
import Register from "./components/Register";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Account from "./components/Account";
import User from "./components/User";
import HandyManPage from "./components/HandyManPage";
import Reset from "./components/Reset";
import Forgot from "./components/Forgot"
import Success from "./components/resetSuccess"


import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import EventBus from "./common/EventBus";
import axios from "axios";


const App = () => {
  const [handyMen, setHandyMen] = useState([]);
  const navigate = useNavigate();
  const API_URL = "http://localhost:5000/api/post/";

const getAllPosts = async () => {
  axios
  .get(API_URL + "getAll")
  .then(response => {
    let posts = response.data.posts;
    setHandyMen(posts);
  })
  .catch(error => {console.log(error)});
};

useEffect(() => {
  if(handyMen.length > 0){
    console.log(handyMen);
    navigate("/search", {state: {handyMen : handyMen}});
  }
}, [handyMen]);

  // let login = useLocation();
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  let location = useLocation();

  useEffect(() => {
    if (["/login", "/register"].includes(location.pathname)) {
      dispatch(clearMessage()); // clear message when changing location
    }
  }, [dispatch, location]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser)
      EventBus.on("logout", () => {
        logOut();
      });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);


  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">

        <Link to={"/"} className="navbar-brand">
          <img src={logo} className='logo' alt="" />
        </Link>

        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            {/* <Link to={"/landing"} className="nav-link">
              Landing Page
            </Link> */}

          </li>


          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
              {/* <Link to={"/account"} className="nav-link">
                {currentUser.username}
              </Link> */}
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                Sign out
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>

          // <div className="dropdown">
          //   <a
          //     className="btn btn-secondary dropdown-toggle"
          //     href="#"
          //     role="button"
          //     id="dropdownMenuLink"
          //     data-toggle="dropdown"
          //     aria-haspopup="true"
          //     aria-expanded="false"
          //   >
          //     Dropdown
          //   </a>
          //   <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
          //     <a className="dropdown-item" href="/login">
          //       Login
          //     </a>
          //     <a className="dropdown-item" href="/register">
          //       Sign Up
          //     </a>
          //   </div>
          // </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="*" element={<LandingPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/account" element={<Account />} />
          <Route path="/user" element={<User />} />
          <Route path="/search" element={<HandyManPage />} />
          {/* {this.state.isAuth ? <Route path="/reset" element={<Reset />} /> : <Route path="/reset" element={<Login />} />} */}
          <Route path="/reset" element={<Reset />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </div>
      <Button onClick={() => getAllPosts()} >Click me for all HandyMen</Button>
    </div>
  );
};

export default App;
