const express = require("express");
const router = express.Router();
const { viewLessons } = require("../../controllers/user");
const { protect } = require("../../middleware/authMiddleware");

router.get("/viewLessons/:offset?", protect, viewLessons);
module.exports = router;
