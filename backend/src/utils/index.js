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
  payload = { ...payload, token: await generateJWTToken(payload.id) };
  return payload;
};

const generateHash = async (password) => {
  return bcrypt.hash(password, await bcrypt.genSalt(10));
};

const validatePassword = async (password, db_password) => {
  return await bcrypt.compare(password, db_password);
};
module.exports = {
  DB_LIMIT: 10,
  validatePassword,
  removePassword,
  addJWTToken,
  generateJWTToken,
  generateHash,
};
