const initial_state = {
  offset: -1,
  data: [],
};
export default (state = initial_state, action) => {
  switch (action.type) {
    case "FETCH_LESSONS":
      return action.payload;
    default:
      return state;
  }
};
