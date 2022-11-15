const initial_state = {
  data: {},
  words: [],
};
export const lessonReducer = (state = initial_state, action) => {
  switch (action.type) {
    case "FETCH_LESSON":
      return action.payload;
    default:
      return state;
  }
};
