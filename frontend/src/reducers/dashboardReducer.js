const initialState = {
  user: {},
  completeLessons: 0,
  wordsLearned: 0,
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

    default:
      return state;
  }
};
