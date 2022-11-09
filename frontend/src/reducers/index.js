import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
export default combineReducers({
  test: () => "0",
  user: userReducer,
});
