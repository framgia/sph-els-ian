const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const path = require("path");
const fs = require("fs");
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

const deleteFile = (name, root) => {
  const protected_files = ["default.jpeg"];
  if (protected_files.includes(name)) {
    return;
  }
  let filepath = root + "/" + name;
  if (fs.existsSync(filepath)) {
    fs.unlink(filepath, (response) => {
      if (response) {
        console.log(response);
      } else {
        console.log("File was deleted");
      }
    });
  } else {
    console.log("File does not exist");
  }
};
module.exports = {
  validatePassword,
  removePassword,
  addJWTToken,
  generateJWTToken,
  generateHash,
  shuffleArray,
  deleteFile,
};
