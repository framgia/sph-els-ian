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

//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const shuffleArray = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

module.exports = {
  validatePassword,
  removePassword,
  addJWTToken,
  generateJWTToken,
  generateHash,
  shuffleArray,
};
