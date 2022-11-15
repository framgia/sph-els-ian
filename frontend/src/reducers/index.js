import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { lessonsListReducer } from "./lessonsListReducer";
import { lessonReducer } from "./lessonReducer";
import { wordReducer } from "./wordReducer";

export default combineReducers({
  test: () => "0",
  user: userReducer,
  lessons: lessonsListReducer,
  words: wordReducer,
  lesson: lessonReducer,
});
