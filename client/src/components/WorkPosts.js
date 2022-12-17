import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import { createPost } from "../services/postService";
import { isEmpty, isLength } from "validator";
import axios from "axios";

const API_URL = "http://localhost:5000/api/post/";

const onlyLettersSpaces = (str) => {
  return /^[A-Za-z\s]*$/.test(str);
}

const WorkPosts = () => {
  const [location, setLocation] = useState("");
  const [postDescription, setDescription] = useState("");

  const { user: currentUser } = useSelector((state) => state.auth);
  console.log("currentUser: ", currentUser.other.username);

  const locationChangeHandler = (event) => {
    setLocation(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  const isLocationValid = (input) => {
    if (!onlyLettersSpaces(input) || isEmpty(input) || !isLength(input , { min: 3, max: 30 }) ){
      return false;
    }
    else{
      return true;
    }
  }

  const isDescriptionValid = (input) => {
    if (isEmpty(input) || !isLength(input , { min: 6, max: 50 }) ){
      return false;
    }
    else{
      return true;
    }
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log("location: ", location);
    console.log("description: ", postDescription);

    if(!isLocationValid(location)){
      alert("Invalid work post. Please try again. Location can only use letters, must not be empty (or just whitespaces), and must be 3-30 characters. Description must be 6-50 characters and must not be empty (or just whitespaces)." )
      setLocation("");
      setDescription("");

      return;
    }

    if(!isDescriptionValid(postDescription)){
      alert("Invalid work post. Please try again. Location can only use letters and must be 6-30 characters. Description must be 6-100 characters." )
      setLocation("");
      setDescription("");

      return;
    }

    // const createPostResponse = await createPost("test", location, postDescription);

    const reqToPost = {
      username: currentUser.other.username,
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
      <h3>Create a Work Request</h3>
      <Form onSubmit={submitHandler}>
        <Form.Label htmlFor="inputUserReadOnly">User</Form.Label>
        <Form.Control
          type="text"
          placeholder= {currentUser.other.username}
          aria-label="User / Disabled input "
          disabled
          readOnly
        />
        <Form.Label htmlFor="inputLocation">Location</Form.Label>
        <Form.Control
          placeholder="City/County/Region" 
          type="text" 
          onChange={locationChangeHandler} 
          value={location}
        />
        <Form.Label htmlFor="inputMessage">Message/Description</Form.Label>
        <Form.Control
          placeholder="e.g. My specialties include..." 
          type="text" 
          onChange={descriptionChangeHandler} 
          value={postDescription}
        />
        <Button className="mt-3" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default WorkPosts;
