import React from "react";
import axios from "axios";
export const GET_USER_MESSAGES_SUCCESS = "GET_USER_MESSAGES_SUCCESS";
export const GET_USER_MESSAGES_ERROR = "GET_USER_MESSAGES_ERROR";

export const GetUserMessages = () => async (dispatch) => {
  const userToken = localStorage.getItem('token')
  const headers = {
    "Content-Type": "application/json",
    token: userToken,
  };

 await axios
    .get(`https://chat-app-mujohn.herokuapp.com/api/messages`, {
      headers,
    })
    .then(async (res) => {
        dispatch(getAUserMessagesSuccess(res.data.messageDatas));
    })
    .catch(async(error) => {
        const errorMessage = 'could not get message successfully';
        dispatch(getUserMessagesError(errorMessage));

    });
    ;
};

export function getAUserMessagesSuccess(data) {
    return {
      type: GET_USER_MESSAGES_SUCCESS,
      payload: data,
    };
  }
  
  export function getUserMessagesError(data) {
    return {
      type: GET_USER_MESSAGES_ERROR,
      payload: data,
    };
  }