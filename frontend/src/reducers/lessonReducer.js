const initial_state = {
  offset: -1,
  data: [],
};
const lessonReducer = (state = initial_state, action) => {
  switch (action.type) {
    case "FETCH_LESSONS":
      return action.payload;
    default:
      return state;
  }
};
export default lessonReducer;
