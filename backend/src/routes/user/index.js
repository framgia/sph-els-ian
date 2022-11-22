const express = require("express");
const router = express.Router();
const {
  viewLesson,
  viewLessons,
  getQuiz,
  submitQuiz,
  showResults,
  showUser,
  changeUserPassword,
  changeUserAvatar,
  fetchUserAvatar,
  changeUserProfile,
  showDashboardWords,
  showDashboardLessons,
  viewUserList,
  viewUserSearch,
} = require("../../controllers/user");
const { protect } = require("../../middleware/authMiddleware");
const { upload } = require("../../middleware/uploadMiddleware");

router.get("/viewLessons/:offset?", protect, viewLessons);
router.post("/viewLesson", protect, viewLesson);
router.post("/getQuiz", protect, getQuiz);
router.post("/submitQuiz", protect, submitQuiz);
router.get("/results/:lesson_id?", protect, showResults);
router.get("/showUser", protect, showUser);
router.post("/changeUserPassword", protect, changeUserPassword);
router.post("/changeUserProfile", protect, changeUserProfile);
router.post(
  "/changeUserAvatar",
  protect,
  upload.single("avatar"),
  changeUserAvatar
);
router.get("/avatar/:user_id?", fetchUserAvatar);
router.get("/showDashboardWords/:offset?", protect, showDashboardWords);
router.get("/showDashboardLessons/:offset?", protect, showDashboardLessons);
router.get("/viewUserList/:offset?", protect, viewUserList);
router.post("/viewUserSearch/:offset?", protect, viewUserSearch);
module.exports = router;
