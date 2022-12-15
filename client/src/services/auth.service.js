import axios from "axios";

const API_URL = "http://localhost:5000/api/user/";

const register = (username, email, password) => {
  return axios.post(API_URL + "create/user", {
    username,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const forgot = (email) => {
  return axios
    .post(API_URL + "forgot/password", {
      email,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user2", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const exportedDefault = { register, login, forgot, logout };
export default exportedDefault;
