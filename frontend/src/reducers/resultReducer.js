const initial_state = {
  quiz: {},
  quiz_items: {},
};
export const resultReducer = (state = initial_state, action) => {
  switch (action.type) {
    case "FETCH_RESULT":
      return action.payload;
    default:
      return state;
  }
};
