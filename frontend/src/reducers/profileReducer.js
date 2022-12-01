const initialState = {
  user: {
    username: "",
    avatar: "",
  },
  followers: 0,
  following: 0,
  isFollowing: false,
  lessonsCompleted: 0,
  wordsLearned: 0,
  activities: [],
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PROFILE":
      return action.payload;
    default:
      return state;
  }
};
