const express = require("express");
const router = express.Router();
const { addLesson, viewLessons, addWord } = require("../../controllers/admin");
const { protect } = require("../../middleware/authMiddleware");

router.post("/addLesson", protect, addLesson);
router.get("/viewLessons/:offset?", protect, viewLessons);
router.post("/addWord", protect, addWord);
module.exports = router;
