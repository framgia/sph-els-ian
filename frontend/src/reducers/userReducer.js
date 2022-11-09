const initial_state = {};

export const userReducer = (state = initial_state, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.payload;
    default:
      return state;
  }
};
