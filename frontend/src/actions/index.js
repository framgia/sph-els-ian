import server from "../api/server";
export const test_action = () => {
  return {
    type: "test_action",
  };
};

export const setUser = (user) => {
  return {
    type: "SET_USER",
    payload: user,
  };
};
export const fetchLessons =
  (offset = 0) =>
  async (dispatch, getState) => {
    const lessons = await server.get(`/api/admin/viewLessons/${offset}`);
    let payload = {
      offset,
      data: lessons.data.data,
      totalLessons: lessons.data.totalLessons,
    };
    dispatch({
      type: "FETCH_LESSONS",
      payload: payload,
    });
  };
