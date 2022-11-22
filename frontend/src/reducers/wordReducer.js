const initialState = {
  offset: -1,
  data: [],
};
export const wordReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_WORDS":
      return action.payload;
    default:
      return state;
  }
};
