const asyncHandler = require("express-async-handler");
const { User } = require("../../models");
const {
  removePassword,
  validatePassword,
  addJWTToken,
  generateHash,
} = require("../../utils");
const registerUser = asyncHandler(async (req, res) => {
  //check payload
  const { username, password } = req.body;

  //error if fail
  if (!username || !password) {
    res.status(400);
    throw new Error("Missing Username/Password");
  }

  //check if user exists
  const user = await User.findOne({ where: { username: username } });

  //error if success
  if (user != undefined) {
    res.status(400);
    throw new Error("User already exists");
  }

  //create account
  let new_user = await User.create({
    username: username,
    password: await generateHash(password),
  });

  //remove password
  new_user = await removePassword(new_user.dataValues);

  //send back
  res.status(200).json(new_user);
});
const loginUser = asyncHandler(async (req, res) => {
  //check payload
  const { username, password } = req.body;

  //error if fail
  if (!username || !password) {
    res.status(400);
    throw new Error("Missing Username/Password");
  }

  //check if user exists
  let user = await User.findOne({ where: { username: username } });
  //error if success
  if (user === null) {
    res.status(400);
    throw new Error("User does not exists");
  }
  //validate password
  user = user.dataValues;
  console.log(user);
  if (!(await validatePassword(password, user.password))) {
    res.status(400);
    throw new Error("Wrong Password");
  }

  //remove password
  user = await removePassword(user);
  //create jwt token
  user = await addJWTToken(user);

  //send back
  res.status(200).json(user);
});
module.exports = { registerUser, loginUser };
