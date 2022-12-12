const initial_state = {
  users: [],
  totalUsers: 0,
};

export const userListReducer = (state = initial_state, action) => {
  switch (action.type) {
    case "FETCH_USER_LIST":
      return { users: action.payload.userList, total: action.payload.total };
    default:
      return state;
  }
};
