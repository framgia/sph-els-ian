const asyncHandler = require("express-async-handler");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const { Lesson } = require("../../models");
const { DB_LIMIT } = require("../../utils/constant");
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
});

const viewLessons = asyncHandler(async (req, res) => {
  //set Offset
  let offset = req.params.offset || 0;
  if (isNaN(offset) || offset < 0) {
    offset = 0;
  }
  //Search for titles
  let lessons = await Lesson.findAll({
    limit: DB_LIMIT,
    offset: offset * DB_LIMIT,
  });
  let total = await Lesson.count();
  //deliver success payload
  res.status(200).json({ data: lessons, totalLessons: total });
});

module.exports = { addLesson, viewLessons };
