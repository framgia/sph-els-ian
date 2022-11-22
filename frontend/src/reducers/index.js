import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { lessonsListReducer } from "./lessonsListReducer";
import { lessonReducer } from "./lessonReducer";
import { wordReducer } from "./wordReducer";
import { quizReducer } from "./quizReducer";
import { resultReducer } from "./resultReducer";
import { dashboardReducer } from "./dashboardReducer";
import { userListReducer } from "./userListReducer";

export default combineReducers({
  test: () => "0",
  user: userReducer,
  lessons: lessonsListReducer,
  words: wordReducer,
  lesson: lessonReducer,
  quiz: quizReducer,
  result: resultReducer,
  dashboard: dashboardReducer,
  userList: userListReducer,
});
