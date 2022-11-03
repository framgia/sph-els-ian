const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const removePassword = async (payload) => {
  delete payload.password;
  return payload;
};

const generateJWTToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const addJWTToken = async (payload) => {
  console.log("ok");
  console.log(payload);
  payload = { ...payload, token: await generateJWTToken(payload.id) };
  return payload;
};

const generateHash = async (password) => {
  console.log(password);
  return bcrypt.hash(password, await bcrypt.genSalt(10));
};
module.exports = {
  removePassword,
  addJWTToken,
  generateJWTToken,
  generateHash,
};
