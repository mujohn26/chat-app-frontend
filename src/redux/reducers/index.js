import { combineReducers } from "redux";
import messageReducer from "./messages/index";
import signupReducer from "./user/signupReducer";
import loginReducer from "./user/loginReducer"
export default combineReducers({
  messageReducer,
  signupReducer,
  loginReducer
});
