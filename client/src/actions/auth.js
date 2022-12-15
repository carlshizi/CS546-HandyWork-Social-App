import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  EMAIL_FOUND,
  EMAIL_NOTFOUND,
} from "./types";

import AuthService from "../services/auth.service";

export const register = (username, email, password) => (dispatch) => {
  return AuthService.register(username, email, password).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        error.response.data

      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const login = (username, password) => (dispatch) => {
  return AuthService.login(username, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        error.response.data

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const forgot = (email) => (dispatch) => {
  return AuthService.forgot(email).then(
    (data) => {
      dispatch({
        type: EMAIL_FOUND,
        payload: { user: data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        // (error.response &&
        //   error.response.data &&
        //   error.response.data.message) ||
        // error.message ||
        // error.toString();
        error.response.data

      dispatch({
        type: EMAIL_NOTFOUND,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};


export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};
