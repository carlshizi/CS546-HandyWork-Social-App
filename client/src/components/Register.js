import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import { delete_cookie } from 'sfcookies'

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { register } from "../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div className="regError2" role="alert">
        Missing field
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="regError2" role="alert">
        This is not a valid email
      </div>
    );
  }
};

const verifyUsername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="regError2" role="alert">
        Username must be at least 3 characters
      </div>
    );
  } else if (/\s/.test(value)) {
    return (<div className="regError2" role="alert">
      No space in the username.
    </div>)
  }
};

const verifyPassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="regError2" role="alert">
        The password must be at least characters.
      </div>
    );
  }
};

const Register = () => {

  const cookie_key = "navigate"   // clear cookie for navigating to reset page
  delete_cookie(cookie_key)

  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const { isLoggedIn } = useSelector(state => state.auth);


  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(username, email, password))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className="login-page">
      <div className="form">
        <h1 className="title2">Create a New Account</h1>

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                {/* <label htmlFor="username">Username</label> */}
                <Input
                  type="text"
                  // className="input"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, verifyUsername]}
                />
              </div>

              <div className="form-group">
                {/* <label htmlFor="email">Email</label> */}
                <Input
                  type="text"
                  // className="input"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                {/* <label htmlFor="password">Password</label> */}
                <Input
                  type="password"
                  // className="input"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, verifyPassword]}
                />
              </div>

              <br />
              <div className="form-group">
                <button className="button">Next</button>
              </div>
              {/* <p className="color">By signing up, you agree to the terms and policies of HandiWork.</p> */}

              <div className="btm-class">
                <p className="message">Aready have an account?
                  <span><a href="/login" className="register"> Sign in</a>
                  </span>
                </p>
              </div>
            </div>
          )}

          {
            message &&
            (
              <div className="form-group">
                <div className={successful ? "success" : "error2"} role="alert">
                  {message}
                </div>
              </div>
            )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Register;
