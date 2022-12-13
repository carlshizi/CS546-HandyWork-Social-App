import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { login } from "../actions/auth";

const emailRequired = (value) => {
  if (!value) {
    return (
      <div className="error">
        <div className="regError2" role="alert">
          Enter a username
        </div>
      </div>
    );
  }
};

const passwordRequired = (value) => {
  if (!value) {
    return (
      <div className="regError2" role="alert">Enter a password</div>
    );
  }
};

const Login = (props) => {
  let navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);

  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(username, password))
        .then(() => {
          navigate("/profile");
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className="login-page">
      <div className="form">
        <h1 className="title">Account Login</h1>

        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            {/* <label htmlFor="username">Username</label> */}
            <Input
              type="text"
              // className="input"
              name="username"
              placeholder="Username"
              value={username}
              onChange={onChangeUsername}
              validations={[emailRequired]}
            />
          </div>

          <div className="form-group">
            {/* <label htmlFor="password">Password</label> */}
            <Input
              type="password"
              // className="input"
              name="password"
              placeholder="Password"
              value={password}
              onChange={onChangePassword}
              validations={[passwordRequired]}
            />
          </div>

          <div className="input">
            <button className="button" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="error">
              <div className="regError" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>

        <a href="/forgot" className="forgot">
          Forgot Password?
        </a>
        <br />
        <p className="message">
          Not registered?
          <a href="/register" className="register"> Click here to register!
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
