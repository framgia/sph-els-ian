const express = require("express");
const router = express.Router();
const { Register } = require("../../controllers/auth");
router.post("/new", Register);

module.exports = router;
