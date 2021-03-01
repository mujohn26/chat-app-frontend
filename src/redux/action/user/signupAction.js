import React from "react";
import axios from "axios";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_ERROR = "CREATE_USER_ERROR";

export const createUser = (userName,email, password) => async (dispatch) => {
  dispatch({
    type: "PAGE_LOADER",
    PageLoader: true,  
  });

 await axios
    .post(`https://chat-app-mujohn.herokuapp.com/api/auth/signup`, {
        userName,
        email, 
        password
    })
    .then(async (res) => {
        const token = res.data.data.token;
        localStorage.setItem("token", token);
        dispatch(createUserSuccess(res.data.message));
    })
    .catch(async(error) => {
        const errorMessage = error.response.data.error;
        dispatch(createUserError(errorMessage));
    });
    ;
};

export function createUserSuccess(data) {
    return {
      type: CREATE_USER_SUCCESS,
      payload: data,
    };
  }
  
  export function createUserError(errorMessage) {
    return {
      type: CREATE_USER_ERROR,
      payload: errorMessage,
    };
  }