const express = require("express");
const router = express.Router();
const { addLesson } = require("../../controllers/admin");
const { protect } = require("../../middleware/authMiddleware");

router.post("/addLesson", protect, addLesson);

module.exports = router;
