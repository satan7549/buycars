// Auth Actions here

import axios from "axios";
import {
  ERROR_TRUE,
  LOADING_TRUE,
  LOG_IN_SUCCESS,
  LOG_OUT_SUCCESS,
  SIGN_UP_SUCCESS,
} from "./Auth.actionType";

const baseURL = "http://localhost:8080/user";

//sign in
export const signIn = (creds) => async (dispatch) => {
  dispatch({ type: LOADING_TRUE });
  try {
    let res = await axios.post(`${baseURL}/register`, creds);
    if (res.data) {
      dispatch({ type: SIGN_UP_SUCCESS });
    }
  } catch (error) {
    dispatch({ type: ERROR_TRUE, payload: error.message });
  }
};

//login function
export const login = (creds) => async (dispatch) => {
  dispatch({ type: LOADING_TRUE });
  try {
    let res = await axios.post(`${baseURL}/login`, creds);
    // const { user, token } = res.data;

    dispatch({ type: LOG_IN_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: ERROR_TRUE, payload: error.message });
  }
};

//logout function
export const logout = () => async (dispatch) => {
  dispatch({ type: LOADING_TRUE });
  try {
    const res = await axios.get(`${baseURL}/logout`);
    dispatch({ type: LOG_OUT_SUCCESS });
    // console.log(res);
  } catch (error) {
    // console.log(error.message);
    dispatch({ type: ERROR_TRUE, payload: error.message });
  }
};
