const express = require("express");
const router = express.Router();
const { viewLesson, viewLessons, getQuiz } = require("../../controllers/user");
const { protect } = require("../../middleware/authMiddleware");

router.get("/viewLessons/:offset?", protect, viewLessons);
router.post("/viewLesson", protect, viewLesson);
router.post("/getQuiz", protect, getQuiz);
module.exports = router;
