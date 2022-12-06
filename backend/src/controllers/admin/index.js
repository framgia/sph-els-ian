const asyncHandler = require("express-async-handler");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const { Lesson, Word, Choice } = require("../../models");
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

const addWord = asyncHandler(async (req, res) => {
  //check payload
  const { lesson_id, new_word, choices = [] } = req.body;

  //error if missing
  if (!lesson_id) {
    res.status(400);
    throw new Error("Missing Lesson ID");
  }
  if (!new_word) {
    res.status(400);
    throw new Error("Missing Word");
  }
  if (choices.length != 4) {
    res.status(400);
    throw new Error("Not Enough Choices");
  }

  //check for duplicate choices
  let temp_set = new Set(choices);
  if (temp_set.size != 4) {
    res.status(400);
    throw new Error("Has Duplicate Choices");
  }

  //check if lesson exists
  let lesson = await Lesson.findOne({ where: { id: lesson_id } });
  if (lesson === undefined) {
    res.status(400);
    throw new Error("Lesson does not exist");
  }

  //check if word exists on lesson
  let word = await Word.findOne({
    where: { lesson_id: lesson_id, jp_word: new_word },
  });
  if (word != undefined) {
    res.status(400);
    throw new Error(`${new_word} already exists`);
  }

  //insert new word
  word = await Word.create(
    {
      lesson_id: lesson_id,
      jp_word: new_word,
      Choices: [
        { isCorrect: true, word: choices[0] },
        { isCorrect: false, word: choices[1] },
        { isCorrect: false, word: choices[2] },
        { isCorrect: false, word: choices[3] },
      ],
    },
    { include: { model: Choice } }
  );

  //send back
  res.status(200).json(`Successfully added ${new_word}`);
});

const viewLessonWords = asyncHandler(async (req, res) => {
  //check payload
  const { lesson_id } = req.body;
  let offset = req.params.offset || 0;

  //check if offset is valid
  if (isNaN(offset) || offset < 0) {
    offset = 0;
  }

  //error if missing
  if (!lesson_id) {
    res.status(400);
    throw new Error("Missing Lesson ID");
  }

  //Check if Lesson exists
  let lesson = await Lesson.findOne({ where: { id: lesson_id } });
  if (lesson === undefined) {
    res.status(400);
    throw new Error("Lesson does not exist");
  }

  //Find Words and Choice
  let words = await Word.findAll({
    attributes: ["id", "jp_word", "lesson_id"],
    where: { lesson_id: lesson_id },
    limit: DB_LIMIT,
    offset: offset * DB_LIMIT,
    include: { model: Choice, attributes: ["id", "word", "isCorrect"] },
  });

  let lesson_word_count = await Word.count({
    where: { lesson_id },
  });

  res.status(200).json({ data: words, totalWords: lesson_word_count });
});

const deleteWord = asyncHandler(async (req, res) => {
  //check if word_id exists
  const { word_id } = req.body;
  if (!word_id) {
    res.status(400);
    throw new Error("Missing Word Id");
  }

  //delete word
  let result = await Word.destroy({
    where: { id: word_id },
  });

  //result = 0 if invalid id or already deleted word
  if (!result) {
    res.status(400);
    throw new Error("Delete Failed");
  }

  //return response
  res.status(200).json({ msg: result });
});

const deleteLesson = asyncHandler(async (req, res) => {
  //check if lesson_id exists
  const { lesson_id } = req.body;
  if (!lesson_id) {
    res.status(400);
    throw new Error("Missing Lesson Id");
  }

  //delete lesson
  let result = await Lesson.destroy({
    where: { id: lesson_id },
  });

  //throw error if delete failed
  if (!result) {
    res.status(400);
    throw new Error("Delete Failed");
  }

  //delete words with lesson_id
  await Word.destroy({ where: { lesson_id } });

  //generate response
  res.status(200).json({ msg: "Lesson Deleted" });
});
module.exports = {
  addLesson,
  viewLessons,
  addWord,
  viewLessonWords,
  deleteWord,
  deleteLesson,
};
