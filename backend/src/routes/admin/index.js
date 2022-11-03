const express = require("express");
const router = express.Router();
const { addLesson, viewLessons } = require("../../controllers/admin");
const { protect } = require("../../middleware/authMiddleware");

router.post("/addLesson", protect, addLesson);
router.get("/viewLessons/:offset?", protect, viewLessons);

module.exports = router;
