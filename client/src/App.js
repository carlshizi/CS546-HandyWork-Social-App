import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import HandymanIcon from '@mui/icons-material/Handyman';
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
// import { Button } from 'react-bootstrap';
import logo from './components/img/Handywork2ii.png'


import "bootstrap/dist/css/bootstrap.min.css";
import "./components/Login.css"
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Profile from "./components/ProfileAPI";
import EditProfile from "./components/EditProfile";
import Account from "./components/Account";
import WorkPosts from "./components/WorkPosts";
import HandyManPage from "./components/HandyManPage";
import Reset from "./components/Reset";
import Forgot from "./components/Forgot"
import Success from "./components/resetSuccess"
import User from "./components/User"
import Search from "./components/partials/Search"

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import EventBus from "./common/EventBus";
import axios from "axios";
import { borderRight } from '@mui/system';




function ResponsiveAppBar() {

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


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

  const currentUserMenu = () => {
    if (currentUser) {
      return <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {pages.map((page) => (
          <Button
            key={page.key}
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: 'white', display: 'block' }}
            href={page.href}
          >
            {page.key}
          </Button>
        ))}
      </Box>
    }
  }

  const pages = [{ key: 'Home', href: "/home" }, { key: 'Search', href: "/searchbar" }];


  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <HandymanIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}>
              HANDYWORK
            </Typography>


            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.key} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.key}</Typography>
                  </MenuItem>
                ))}
              </Menu>

            </Box>


            {currentUserMenu()}

            <Box sx={{ flexGrow: 0 }}>
              {/* <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip> */}



              {currentUser ? (

                <div>
                  <Link to={"/profile"}>
                    {currentUser.username}
                  </Link>

                  <a href="/login" onClick={logOut} style={{ color: 'white', fontSize: '14px' }}>
                    SIGN OUT
                  </a>
                </div>
              ) : (
                <div style={{ position: "absolute", right: "0", top: "20px" }}>
                  <Link to={"/login"} style={{ color: 'white', fontSize: '14px' }}>
                    LOGIN
                  </Link>
                  <Link to={"/register"} style={{ color: 'white', fontSize: '14px', marginLeft: "20px" }}>
                    SIGN UP
                  </Link>
                </div>
              )}

            </Box>

          </Toolbar>
        </Container>
      </AppBar>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/account" element={<Account />} />
          <Route path="/work" element={<WorkPosts />} />
          <Route path="/search" element={<HandyManPage />} />
          <Route path="/user/:username" element={<User />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/success" element={<Success />} />
          <Route path="/searchbar" element={<Search />} />
        </Routes>
      </div>



    </div>
  );
}
export default ResponsiveAppBar;

