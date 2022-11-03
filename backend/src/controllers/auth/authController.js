const asyncHandler = require("express-async-handler");
const { User } = require("../../models");
const { removePassword, addJWTToken, generateHash } = require("../../utils");
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

  //create jwt token
  new_user = await addJWTToken(new_user);

  //send back
  res.status(200).json(new_user);
});

module.exports = { registerUser };
