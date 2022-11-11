const asyncHandler = require("express-async-handler");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const { Lesson, Word, Choice } = require("../../models");
const { DB_LIMIT } = require("../../utils/constant");
const { shuffleArray } = require("../../utils/");

const viewLessons = asyncHandler(async (req, res) => {
  //set Offset
  let offset = req.params.offset || 0;
  if (isNaN(offset) || offset < 0) {
    offset = 0;
  }

  //Search for titles
  let lessons = await Lesson.findAll({
    attributes: ["id", "title", "description"],
    include: [{ model: Word, required: true }],
    limit: DB_LIMIT,
    offset: offset * DB_LIMIT,
  });

  //Count all Lessons with at least 1 Word
  let total = await Lesson.count({
    distinct: true,
    col: `id`,
    include: [{ model: Word, right: true }],
  });

  //deliver success payload
  res.status(200).json({ data: lessons, totalLessons: total });
});

const viewLesson = asyncHandler(async (req, res) => {
  //set lesson_id
  let { lesson_id } = req.body;

  //check if lesson_id is valid
  if (isNaN(lesson_id) || lesson_id < 1) {
    res.status(400);
    throw new Error("Invalid Lesson ID");
  }

  //get lesson
  let lesson = await Lesson.findOne({
    attributes: ["id", "title", "description"],
    where: { id: lesson_id },
  });

  let words = await Word.findAll({
    attributes: ["id", "jp_word", "lesson_id"],
    where: { lesson_id: lesson_id },
    limit: DB_LIMIT,
    include: {
      model: Choice,
      attributes: ["word"],
      where: { isCorrect: 1 },
    },
  });
  res.status(200).json({ lesson, words });
});

const getQuiz = asyncHandler(async (req, res) => {
  //set lesson_id
  let { lesson_id } = req.body;

  //check if lesson_id is valid
  if (isNaN(lesson_id) || lesson_id < 1) {
    res.status(400);
    throw new Error("Invalid Lesson ID. Please try another one.");
  }
  let lesson = await Lesson.findOne({
    attributes: ["id", "title", "description"],
    where: { id: lesson_id },
  });
  if (!lesson) {
    res.status(400);
    throw new Error("Invalid Lesson ID. Please try another one.");
  }

  //get Words
  let words = await Word.findAll({
    attributes: ["id", "jp_word", "lesson_id"],
    where: { lesson_id: lesson_id },
    include: {
      model: Choice,
      attributes: ["id", "word"],
    },
  });

  // check if words are empty and throw error if true
  if (words.length === 0) {
    res.status(400);
    throw new Error("No Quiz Items. Please try another one.");
  }

  //randomize choices
  words = words.map((word) => {
    shuffleArray(word.Choices);
    return word;
  });

  //randomize words
  shuffleArray(words);

  res.status(200).json({ words });
});

module.exports = { viewLesson, viewLessons, getQuiz };
