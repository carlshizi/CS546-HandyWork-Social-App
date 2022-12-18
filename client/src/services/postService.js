import axios from "axios";

const API_URL = "http://localhost:5000/api/post/";

const getAllPosts = async () => {
  axios
  .get(API_URL + "getAll")
  .then(response => {return response})
  .catch(error => {return error});
};

const createPost = async (username, location, message) => {

  const reqToPost = {
    username: username,
    location: location,
    message: message
  };

  console.log("Attempted post: ", reqToPost);

  const response = await axios
            .post((API_URL + 'create/post'), reqToPost)
            .catch((error) => console.log('Error: ', error));
        if (response) {
            console.log(response);
        }

  return response;
}

export {
  getAllPosts,
  createPost
};