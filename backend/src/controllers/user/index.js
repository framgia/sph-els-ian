const asyncHandler = require("express-async-handler");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const { Lesson, Word, Choice } = require("../../models");
const { DB_LIMIT } = require("../../utils/constant");

const viewLessons = asyncHandler(async (req, res) => {
  //set Offset
  let offset = req.params.offset || 0;
  if (isNaN(offset) || offset < 0) {
    offset = 0;
  }
  //Search for titles
  let lessons = await Lesson.findAll({
    attributes: ["id", "title", "description"],
    limit: DB_LIMIT,
    offset: offset * DB_LIMIT,
  });
  let total = await Lesson.count();
  //deliver success payload
  res.status(200).json({ data: lessons, totalLessons: total });
});

module.exports = { viewLessons };
