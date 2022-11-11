const initial_state = {
  words: [],
};
export const quizReducer = (state = initial_state, action) => {
  switch (action.type) {
    case "FETCH_QUIZ":
      return action.payload;
    default:
      return state;
  }
};
