import axios from "axios";

const API_URL = "http://localhost:5000/api/post/";

const getAllPosts = () => {
  return axios.get(API_URL + "getAll");
};

export default {
  getAllPosts
};