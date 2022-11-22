const initialState = {
  data: {},
  words: [],
};
export const lessonReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_LESSON":
      return action.payload;
    default:
      return state;
  }
};
