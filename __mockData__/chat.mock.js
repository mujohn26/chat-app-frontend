import {
  GET_USER_MESSAGES_SUCCESS,
  GET_USER_MESSAGES_ERROR,
} from "../src/redux/action/message/index";

export const props = {
  messages: [
    [
      {
        id: 2,
        senderid: 3,
        message: "Hello",
        receivername: "John",
      },
    ],
  ],
  classes: {
    paper: "",
  },
  state: {
    email: "mujohn25@gmail.com",
  },

  GetUserMessages: jest.fn(),
  componentDidUpdate: jest.fn(),
};
export const getMessageErrorAction = {
  type: GET_USER_MESSAGES_ERROR,
  payload: "could not get message successfully",
};
export const getMessageActionSUccess = {
  type: GET_USER_MESSAGES_SUCCESS,
  payload: [
    [
      {
        id: 2,
        senderid: 3,
        message: "Hello",
        receivername: "John",
      },
    ],
  ],
};
