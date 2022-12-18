import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from 'react-router-dom';
import { bake_cookie } from 'sfcookies';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { forgot } from "../actions/auth";


const emailRequired = (value) => {
    if (!value) {
        return (
            <div className="error">
                <div className="regError2" role="alert">
                    Enter your email
                </div>
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


const Forgot = (props) => {
    let navigate = useNavigate();
    const cookie_key = 'navigate';

    const form = useRef();
    const checkBtn = useRef();

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);


    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);

    const dispatch = useDispatch();

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };


    const handleLogin = (e) => {
        e.preventDefault();

        setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            dispatch(forgot(email))
                .then(() => {
                    const returnedJSON = JSON.parse(localStorage.getItem("user2"))
                    const _id = returnedJSON.accessToken.user
                    const token = returnedJSON.token
                    // console.log(returnedJSON)
                    bake_cookie(cookie_key, 'one')
                    navigate(`/reset?token=${token}&_id=${_id}`);
                    // window.location.reload();
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
                <h1 className="title3">Enter your email to find account</h1>

                <Form onSubmit={handleLogin} ref={form}>
                    <div className="form-group">
                        {/* <label htmlFor="username">Username</label> */}
                        <Input
                            type="text"
                            // className="input"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={onChangeEmail}
                            validations={[emailRequired, validEmail]}
                        />
                    </div>

                    <div className="input">
                        <button className="button" disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Next</span>
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
            </div>
        </div>
    );
};

export default Forgot;
