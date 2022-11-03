const express = require("express");
const { registerUser } = require("../../controllers/auth/authController");
const router = express.Router();

router.post("/new", registerUser);

module.exports = router;
