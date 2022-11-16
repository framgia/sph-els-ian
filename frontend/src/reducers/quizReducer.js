const initialState = {
  words: [],
};
export const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_QUIZ":
      return action.payload;
    default:
      return state;
  }
};
