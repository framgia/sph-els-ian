const initialState = {
  user: {},
  completeLessons: 0,
  wordsLearned: 0,
  totalQuizzes: 0,
  quizzes: [],
};
export const dashboardReducer = (state = initialState, action) => {
  let payload = action.payload;
  switch (action.type) {
    case "FETCH_DASHBOARD_USER":
      return {
        ...state,
        user: payload.user,
        completeLessons: payload.completeLessons,
        wordsLearned: payload.wordsLearned,
      };
    case "FETCH_DASHBOARD_LESSONS":
      return {
        ...state,
        totalQuizzes: payload.totalQuizzes,
        quizzes: payload.quizzes,
      };
    default:
      return state;
  }
};
