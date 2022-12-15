import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import { read_cookie, bake_cookie } from 'sfcookies'

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

const required = (value) => {
    if (!value) {
        return (
            <div className="regError2" role="alert">
                Missing field
            </div>
        );
    }
};


const verifyPassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="regError2" role="alert">
                The password must be at least characters
            </div>
        );
    }
};

const Reset = () => {
    let navigate = useNavigate();
    const location = useLocation();
    const user = location.search.split("?")[1]

    const form = useRef();
    const checkBtn = useRef();

    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState("");
    const { isLoggedIn } = useSelector(state => state.auth);

    const { message } = useSelector(state => state.message);


    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    // to check coo kie from previous login screen
    const cookie_key = "navigate"

    const handleClick = async (e) => {
        e.preventDefault();

        if (checkBtn.current.context._errors.length === 0) {
            const submission = await fetch(`http://localhost:5000/api/user/reset/password?${user}`, {
                method: "PUT", headers: { 'Content-Type': "application/JSON" },
                body: JSON.stringify({ password: password })
            })

            // console.log("Before submission ok " + read_cookie(cookie_key))
            if (submission.ok) {
                bake_cookie(cookie_key, "two");
                navigate("/success")
            }

        }
    };

    if (read_cookie(cookie_key) !== 'one' && isLoggedIn) {
        return <Navigate to="/profile" />;
    } else if (read_cookie(cookie_key) !== 'one' && !isLoggedIn) {
        return <Navigate to="/login" />;
    }

    if (isLoggedIn) {
        return <Navigate to="/profile" />;
    }


    return (
        <div className="login-page">
            <div className="form">
                <p>Enter a new password</p>

                <Form onSubmit={handleClick} ref={form}>
                    {!successful && (
                        <div>
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

                            <div className="form-group">
                                <button className="button">Reset</button>
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

export default Reset;
