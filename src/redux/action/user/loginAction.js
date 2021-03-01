import React from "react";
import axios from "axios";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_ERROR = "LOGIN_USER_ERROR";

export const loginUser = (email, password) => async (dispatch) => {
  dispatch({
    type: "PAGE_LOADER",
    PageLoader: true,  
  });

 await axios
    .post(`https://chat-app-mujohn.herokuapp.com/api/auth/login`, {
        email, 
        password
    })
    .then(async (res) => {
        const token = res.data.data.token;
        localStorage.setItem("token", token);
        dispatch(loginUserSuccess(res.data.message));
    })
    .catch(async(error) => {
        const errorMessage = error.response.data.error;
        dispatch(loginUserError(errorMessage));
    });
    ;
};

export function loginUserSuccess(data) {
    return {
      type: LOGIN_USER_SUCCESS,
      payload: data,
    };
  }
  
  export function loginUserError(errorMessage) {
    return {
      type: LOGIN_USER_ERROR,
      payload: errorMessage,
    };
  }