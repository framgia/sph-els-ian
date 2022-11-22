const initialState = {
  offset: -1,
  data: [],
};
export const lessonsListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_LESSONS":
      return action.payload;
    default:
      return state;
  }
};
