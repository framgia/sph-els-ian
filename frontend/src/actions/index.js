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

export const removeUser = () => {
  window.localStorage.removeItem("data");
  window.localStorage.removeItem("accessToken");
  return {
    type: "REMOVE_USER",
  };
};

export const fetchLessonsAdmin =
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

export const fetchLessons =
  (offset = 0) =>
  async (dispatch, getState) => {
    const lessons = await server.get(`/user/viewLessons/${offset}`);
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

export const fetchLesson = (lessonId) => async (dispatch) => {
  const { data } = await server.post(`/user/viewLesson`, {
    lesson_id: lessonId,
  });
  let payload = {
    data: data.lesson,
    words: data.words,
    hasTaken: data.hasTaken,
  };
  dispatch({ type: "FETCH_LESSON", payload: payload });
};

export const fetchWords =
  (offset = 0, lessonId) =>
  async (dispatch, getState) => {
    const words = await server.post(`/api/admin/viewLessonWords/${offset}`, {
      lesson_id: lessonId,
    });
    let payload = {
      offset,
      data: words.data.data,
      totalWords: words.data.totalWords,
    };
    dispatch({
      type: "FETCH_WORDS",
      payload: payload,
    });
  };

export const fetchQuiz = (lessonId) => async (dispatch, getState) => {
  const { data } = await server.post("/user/getQuiz", {
    lesson_id: lessonId,
  });
  let payload = {
    words: data.words,
  };
  dispatch({
    type: "FETCH_QUIZ",
    payload: payload,
  });
};

export const fetchResult = (lessonId) => async (dispatch, getState) => {
  const response = await server.get(`/user/results/${lessonId}`);
  let { data } = response;
  dispatch({
    type: "FETCH_RESULT",
    payload: data,
  });
};

export const viewProfile = (userId) => async (dispatch, getState) => {
  await server
    .get(`/user/viewProfile/${userId}`)
    .then((response) => {
      let { data } = response;
      dispatch({
        type: "FETCH_PROFILE",
        payload: data,
      });
    })
    .catch((error) => {});
};
