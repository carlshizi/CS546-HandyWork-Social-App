import axios from "axios";

const API_URL = "http://localhost:5000/api/post/";

const getAllPosts = async () => {
  axios
  .get(API_URL + "getAll")
  .then(response => {return response})
  .catch(error => {return error});
};

export {
  getAllPosts
};