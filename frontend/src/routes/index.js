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
            <Route
              path="dashboard"
              element={<Dashboard />}
            />
            <Route
              path="lessons"
              element={<LessonCardsPage />}
            />
            <Route
              path="lessons/notfound"
              element={<PageNotFound />}
            />
            <Route
              path="lessons/:lesson_id"
              element={<LessonPage />}
            />
            <Route
              path="admin/lessons"
              element={<AdminLessonListPage />}
            />
            <Route
              path="admin/lessons/:lesson_id"
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
