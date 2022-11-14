const express = require("express");
const router = express.Router();
const {
  addLesson,
  viewLessons,
  addWord,
  viewLessonWords,
} = require("../../controllers/admin");
const { isAdmin } = require("../../middleware/adminMiddleware");
const { protect } = require("../../middleware/authMiddleware");

router.post("/addLesson", protect, isAdmin, addLesson);
router.get("/viewLessons/:offset?", protect, isAdmin, viewLessons);
router.post("/addWord", protect, isAdmin, addWord);
router.post("/viewLessonWords/:offset?", protect, isAdmin, viewLessonWords);
module.exports = router;
