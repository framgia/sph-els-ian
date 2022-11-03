const express = require("express");
const {
  registerUser,
  loginUser,
} = require("../../controllers/auth/authController");
const router = express.Router();

router.post("/new", registerUser);
router.post("/old", loginUser);

module.exports = router;
