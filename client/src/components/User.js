import React, { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useSelector } from "react-redux";

const User = () => {
  const [location, setLocation] = useState("");
  const [postDescription, setDescription] = useState("");

  const { user: currentUser } = useSelector((state) => state.auth);

  const locationChangeHandler = (event) => {
    setLocation(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setLocation("");
    setDescription("");

    alert("Thank you! Your handy work request was successfully submitted!");
  };
  // if (!currentUser) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>User</strong>
        </h3>
      </header>
      <Form onSubmit={submitHandler}>
        <Form.Label htmlFor="inputLocation">Location</Form.Label>
        <Form.Control 
          type="text" 
          onChange={locationChangeHandler} 
          value={location}
        />
        <Form.Label htmlFor="inputMessage">Message/Description</Form.Label>
        <Form.Control 
          type="text" 
          onChange={descriptionChangeHandler} 
          value={postDescription}
        />
        <Button type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default User;
