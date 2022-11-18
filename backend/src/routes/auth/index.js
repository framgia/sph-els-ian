const express = require("express");
const {
  registerUser,
  loginUser,
  fetchUser,
} = require("../../controllers/auth");
const { protect } = require("../../middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", protect, fetchUser);
module.exports = router;
