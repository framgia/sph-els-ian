const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { User } = require("../models");
const isAdmin = asyncHandler(async (req, res, next) => {
  let user_id = req.user_id || 0;
  const user = await User.findOne({
    attributes: ["isAdmin"],
    where: { id: user_id },
  });
  if (user.isAdmin) {
    next();
  } else {
    res.status(403);
    throw new Error("Forbidden. Get an Administrator Account.");
  }
});

module.exports = { isAdmin };
