import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import { createPost } from "../services/postService";
import axios from "axios";

const API_URL = "http://localhost:5000/api/post/";

const WorkPosts = () => {
  const [location, setLocation] = useState("");
  const [postDescription, setDescription] = useState("");

  const { user: currentUser } = useSelector((state) => state.auth);

  const locationChangeHandler = (event) => {
    setLocation(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log("location: ", location);
    console.log("description: ", postDescription);

    // const createPostResponse = await createPost("test", location, postDescription);

    const reqToPost = {
      username: "KolaTest",
      location: location,
      message: postDescription
    };

    console.log("Attempted post: ", reqToPost);
  
    const response = await axios
              .post((API_URL + 'create/post'), reqToPost)
              .catch((error) => console.log('Error: ', error));
          if (response) {
              console.log(response);
          }

    setLocation("");
    setDescription("");

    if(response){
      alert("Thank you! Your handy work request was successfully submitted!");
    }
  };

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

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

export default WorkPosts;
