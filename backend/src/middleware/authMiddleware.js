const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Get token from header
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized");
    }
  } else if (!token) {
    res.status(401);
    throw new Error("Not Authorized No Token");
  }
});

module.exports = { protect };
