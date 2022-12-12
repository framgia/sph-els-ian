import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "../pages/Homepage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PageNotFound from "../pages/PageNotFound";
import Layout from "../components/Layout";
import ProtectedRoutes from "../components/ProtectedRoutes";
import Dashboard from "../pages/Dashboard";
import AdminLessonListPage from "../pages/admin/AdminLessonListPage";
import AdminLessonPage from "../pages/admin/AdminLessonPage";
import LessonCardsPage from "../pages/user/LessonCardsPage";
import LessonPage from "../pages/user/LessonPage";
import QuizPage from "../pages/QuizPage";
import ResultsPage from "../pages/ResultsPage";
import UserSettings from "../pages/UserSettings";
import UserListPage from "../pages/UserListPage";
import UserSearchPage from "../pages/UserSearchPage";
import ProfilePage from "../pages/ProfilePage";

const RouteList = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout />}
        >
          <Route
            path=""
            element={<Homepage />}
          />
          <Route
            path="login"
            element={<Login />}
          />
          <Route
            path="register"
            element={<Register />}
          />
          <Route element={<ProtectedRoutes />}>
            {/* Regular User Routes */}
            <Route
              path="dashboard"
              element={<Dashboard />}
            />
            <Route
              path="settings"
              element={<UserSettings />}
            />
            <Route
              path="lessons"
              element={<LessonCardsPage />}
            />
            <Route
              path="search"
              element={<UserSearchPage />}
            />

            <Route
              path="users"
              element={<UserListPage />}
            />
            <Route
              path="users/:userId"
              element={<ProfilePage />}
            />
            <Route
              path="lessons/:lessonId"
              element={<LessonPage />}
            />
            <Route
              path="quiz/:lessonId"
              element={<QuizPage />}
            />
            <Route
              path="results/:lessonId"
              element={<ResultsPage />}
            />
            {/* Admin Routes */}
            <Route
              path="admin/lessons"
              element={<AdminLessonListPage />}
            />
            <Route
              path="admin/lessons/:lessonId"
              element={<AdminLessonPage />}
            />
          </Route>
          <Route
            path="*"
            element={<PageNotFound />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default RouteList;
