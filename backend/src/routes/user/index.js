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
} = require("../../controllers/user");
const { protect } = require("../../middleware/authMiddleware");

router.get("/viewLessons/:offset?", protect, viewLessons);
router.post("/viewLesson", protect, viewLesson);
router.post("/getQuiz", protect, getQuiz);
router.post("/submitQuiz", protect, submitQuiz);
router.get("/results/:lesson_id?", protect, showResults);
router.get("/showUser", protect, showUser);
router.post("/changeUserPassword", protect, changeUserPassword);
module.exports = router;
