const express = require("express");
const router = express.Router();
const {
  addLesson,
  viewLessons,
  addWord,
  viewLessonWords,
  deleteWord,
} = require("../../controllers/admin");
const { isAdmin } = require("../../middleware/adminMiddleware");
const { protect } = require("../../middleware/authMiddleware");

router.post("/addLesson", protect, isAdmin, addLesson);
router.get("/viewLessons/:offset?", protect, isAdmin, viewLessons);
router.post("/addWord", protect, isAdmin, addWord);
router.post("/viewLessonWords/:offset?", protect, isAdmin, viewLessonWords);
router.post("/deleteWord", protect, isAdmin, deleteWord);
module.exports = router;
