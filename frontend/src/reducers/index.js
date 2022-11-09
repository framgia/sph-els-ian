import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import lessonReducer from "./lessonReducer";
export default combineReducers({
  test: () => "0",
  user: userReducer,
  lessons: lessonReducer,
});
