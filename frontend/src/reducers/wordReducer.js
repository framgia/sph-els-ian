const initial_state = {
  offset: -1,
  data: [],
};
export const wordReducer = (state = initial_state, action) => {
  switch (action.type) {
    case "FETCH_WORDS":
      return action.payload;
    default:
      return state;
  }
};
