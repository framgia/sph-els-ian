const asyncHandler = require("express-async-handler");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const { Lesson } = require("../../models");
const user = require("../../models/user");
const addLesson = asyncHandler(async (req, res) => {
  //parse and check payload
  const { title, description } = req.body;
  if (!title || !description) {
    res.status(400);
    throw new Error("Missing title/description");
  }
  //check if title is unique
  let lesson = await Lesson.findOne({ where: { title: title } });

  //Error if not
  if (lesson != null) {
    res.status(400);
    throw new Error("Title already exists");
  }

  //Create new Lesson
  let new_lesson = await Lesson.create({
    title,
    description,
  });

  //deliver success payload
  res.status(200).json({ data: new_lesson });
  //   res.status(200).json({ msg: "lesson added" });
});

module.exports = { addLesson };
