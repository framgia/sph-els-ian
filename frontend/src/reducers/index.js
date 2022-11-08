import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { lessonReducer } from "./lessonReducer";
import { wordReducer } from "./wordReducer";
export default combineReducers({
  test: () => "0",
  user: userReducer,
  lessons: lessonReducer,
  words: wordReducer,
});
