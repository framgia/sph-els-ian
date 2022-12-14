const asyncHandler = require("express-async-handler");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const {
  Lesson,
  Word,
  Choice,
  Quiz,
  QuizItem,
  User,
  sequelize,
  Sequelize,
} = require("../../models");
const { DB_LIMIT } = require("../../utils/constant");
const {
  shuffleArray,
  validatePassword,
  validateEmail,
  generateHash,
  deleteFile,
} = require("../../utils/");
const { Op } = require("sequelize");

const { UPLOAD_DEST } = process.env;
const fs = require("fs");
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

  if (lesson === null) {
    res.status(403);
    throw new Error("Lesson does not exist.");
  }
  //get sample words
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
  //check if user has already taken the quiz
  const user = await Quiz.findOne({
    where: { user_id: req.user_id, lesson_id },
  });
  let hasTaken = false;
  //error if success
  if (user != undefined) {
    hasTaken = true;
  }

  res.status(200).json({ lesson, words, hasTaken });
});

const getQuiz = asyncHandler(async (req, res) => {
  //set lesson_id
  let { lesson_id } = req.body;

  //check if lesson_id is valid
  if (isNaN(lesson_id) || lesson_id < 1) {
    res.status(400);
    throw new Error("Invalid Lesson ID. Please try another one.");
  }

  //check if user has already taken the quiz
  const user = await Quiz.findOne({
    where: { user_id: req.user_id, lesson_id },
  });

  //error if success
  if (user != undefined) {
    res.status(400);
    throw new Error("User has already taken the Quiz");
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

const submitQuiz = asyncHandler(async (req, res) => {
  //get answers and lesson_id
  let { answers = {}, lesson_id } = req.body;

  if (!lesson_id) {
    res.status(400);
    throw new Error("Missing lesson_id");
  }
  if (Object.keys(answers).length === 0) {
    res.status(400);
    throw new Error("Missing answers");
  }
  let result = [];
  let score = 0;

  //check if user has already taken the quiz
  const user = await Quiz.findOne({
    where: { lesson_id, user_id: req.user_id },
  });

  //error if success
  if (user != undefined) {
    res.status(400);
    throw new Error("User has already taken the Quiz");
  }

  //get correct answers
  const correct_answers = await Word.findAll({
    attributes: ["id"],
    where: { lesson_id },
    include: {
      model: Choice,
      attributes: ["id", "word"],
      where: { isCorrect: true },
    },
  });

  //validate answers
  correct_answers.map((question) => {
    let correct_answer = question.Choices[0].id;
    let answer;

    if (question.id in answers) {
      answer = answers[question.id];
    } else {
      answer = 0;
    }
    if (correct_answer === answer) {
      result.push({ word_id: question.id, isCorrect: true, answer_id: answer });
      score += 1;
    } else {
      result.push({
        word_id: question.id,
        isCorrect: false,
        answer_id: answer,
      });
    }
  });

  //insert score to quiz
  const quiz = await Quiz.create({
    user_id: req.user_id,
    lesson_id,
    score: score,
  });

  //add quiz_id to inputs for QuizItem
  result = result.map((obj) => ({ ...obj, quiz_id: quiz.id }));

  //insert answers to quiz_items
  await QuizItem.bulkCreate([...result]);

  //return score
  res.status(200).json({ msg: "submitQuiz Working", result });
});

const showResults = asyncHandler(async (req, res) => {
  //get lesson id
  let lesson_id = req.params.lesson_id || 0;
  //check lesson id
  if (isNaN(lesson_id) || lesson_id < 1) {
    res.status(400);
    throw new Error("Invalid lesson_id");
  }
  //get quiz results via lesson_id, user_id
  let quiz = await Quiz.findOne({
    where: { lesson_id, user_id: req.user_id },
    include: [
      {
        model: Lesson,
        attributes: ["title"],
      },
    ],
    raw: true,
  });

  //throw error if not found
  if (quiz === null) {
    res.status(403);
    throw new Error("User has not taken the Quiz.");
  }

  //get quiz items via quiz_id
  let quiz_items = await QuizItem.findAll({
    where: { quiz_id: quiz.id },
    attributes: ["word_id", "isCorrect"],
    include: [
      {
        model: Word,
        attributes: ["jp_word"],
        include: [
          {
            model: Choice,
            attributes: [["word", "answer"]],
            where: { isCorrect: true },
          },
        ],
      },
    ],
    raw: true,
  });
  //return quiz and quiz items
  res.status(200).json({ quiz, quiz_items });
});

const showUser = asyncHandler(async (req, res) => {
  //find User
  const user = await User.findOne({
    where: { id: req.user_id },
    attributes: ["username", "avatar", "isAdmin"],
  });

  //find Quizzes and Sum of Score
  let complete_lessons = 0;
  let words_learned = 0;
  const quizzes = await Quiz.findAll({
    attributes: [
      "lesson_id",
      [sequelize.fn("sum", sequelize.col("score")), "score"],
      [sequelize.fn("count", sequelize.col("lesson_id")), "lessons"],
    ],
    group: ["user_id"],
    where: { user_id: req.user_id },
    raw: true,
  }).then((response) => {
    if (response.length !== 0) {
      complete_lessons = response[0].lessons;
      words_learned = parseInt(response[0].score);
    }
  });
  //find Followers and following

  //generate response
  res.status(200).json({
    user,
    completeLessons: complete_lessons,
    wordsLearned: words_learned,
  });
});
const showDashboardLessons = asyncHandler(async (req, res) => {
  //set Offset
  let offset = req.params.offset || 0;
  if (isNaN(offset) || offset < 0) {
    offset = 0;
  }
  let [totalQuizzes, quizzes] = await Promise.all([
    //total quizzes
    Quiz.count({
      where: { user_id: req.user_id },
    }),
    //quizzes
    Quiz.findAll({
      where: { user_id: req.user_id },
      attributes: [
        "id",
        "score",
        [sequelize.col("Lesson.title"), "title"],
        [sequelize.col("Lesson.id"), "lessonId"],
      ],
      include: {
        model: Lesson,
        attributes: [],
      },
      limit: DB_LIMIT,
      offset: offset * DB_LIMIT,
      raw: true,
    }),
  ]);

  //return empty if null
  res
    .status(200)
    .json({ quizzes: quizzes || [], totalQuizzes: totalQuizzes || 0 });
});

const changeUserPassword = asyncHandler(async (req, res) => {
  //check payload
  const { current_password, new_password } = req.body;

  //error if fail
  if (!current_password || !new_password) {
    res.status(400);
    throw new Error("Missing Current/New Password");
  }

  //find user password
  const user = await User.findOne({ where: { id: req.user_id } });

  //verify current password
  if (!(await validatePassword(current_password, user.password))) {
    res.status(400);
    throw new Error("Wrong Current Password");
  }

  //check if password is the same
  if (current_password === new_password) {
    res.status(400);
    throw new Error("New Password cannot be old password");
  }

  //update new password
  await User.update(
    { password: await generateHash(new_password) },
    { where: { id: req.user_id } }
  );

  //deliver success payload
  res.status(200).json({ message: "Password Changed Successfully" });
});

const changeUserAvatar = asyncHandler(async (req, res) => {
  //check if file upload is successful
  let filename = "";
  if (req.fileError) {
    res.status(415);
    throw new Error(req.fileError);
  }

  //if no files are uploaded considered as remove avatar
  filename = req.file?.filename || "default.jpeg";

  //delete previous image
  let { avatar } = await User.findOne({
    attributes: ["avatar"],
    where: { id: req.user_id },
  });
  deleteFile(avatar, UPLOAD_DEST);

  // update User avatar
  await User.update({ avatar: filename }, { where: { id: req.user_id } });

  //add response
  res.status(200).json({ msg: "Successfully changed Avatar" });
});

const fetchUserAvatar = asyncHandler(async (req, res) => {
  //check for parameters
  //if no parameters use user_id
  let user_id = req.params.user_id;

  //error if parameter is invalid
  if (isNaN(user_id) || user_id < 0) {
    res.status(400);
    throw new Error("Invalid User ID");
  }

  //find the avatar
  let user = await User.findOne({
    attributes: ["avatar"],
    where: { id: user_id },
  });

  //set to default if no connected avatar
  let avatar = "default.jpeg";
  if (user !== null) {
    avatar = user.avatar;
  }

  //setup file path
  let filepath = UPLOAD_DEST + "/" + avatar;

  //check if file exists
  if (!fs.existsSync(filepath)) {
    avatar = "default.jpeg";
  }

  //send file
  res.status(200).sendFile(avatar, { root: UPLOAD_DEST });
});

const changeUserProfile = asyncHandler(async (req, res) => {
  //get username and email then validate
  let { username, email } = req.body;
  if (!username || !email) {
    res.status(400);
    throw new Error("Missing Username/Email");
  }

  //validate email
  if (!validateEmail(email)) {
    res.status(400);
    throw new Error("Wrong Email Format");
  }

  //check if new username already exists
  const user = await User.findOne({
    where: { username: username, id: { [Op.not]: req.user_id } },
  });
  //error if success
  if (user != undefined) {
    res.status(400);
    throw new Error("User already exists");
  }

  //update row
  let response = await User.update(
    { username, email },
    { where: { id: req.user_id } }
  );

  //return success payload
  res.status(200).json({ message: "Profile Changed Successfully" });
});

const showDashboardWords = asyncHandler(async (req, res) => {
  //check for offset
  let offset = req.params.offset || 0;
  if (isNaN(offset) || offset < 0) {
    offset = 0;
  }

  const [totalWords, words] = await Promise.all([
    //totalWords
    QuizItem.count({
      attributes: ["id"],
      include: [
        {
          model: Quiz,
          where: { user_id: req.user_id },
        },
      ],
      where: { isCorrect: true },
    }),
    //words
    QuizItem.findAll({
      attributes: ["id"],
      include: [
        {
          model: Quiz,
          where: { user_id: req.user_id },
          attributes: ["id"],
        },
        {
          model: Word,
          attributes: ["id", "jp_word"],
          include: {
            model: Choice,
            where: {
              isCorrect: true,
            },
            attributes: ["id", "word"],
          },
        },
      ],
      where: { isCorrect: true },
      limit: DB_LIMIT,
      offset: offset * DB_LIMIT,
      raw: true,
    }).then((response) => {
      let word_payload = [];
      response.forEach((word) => {
        word_payload.push({
          id: word.id,
          jp_word: word["Word.jp_word"],
          word: word["Word.Choices.word"],
        });
      });
      return word_payload;
    }),
  ]);

  //generate response
  res.status(200).json({ words, totalWords });
});

const viewUserList = asyncHandler(async (req, res) => {
  //set Offset
  let offset = req.params.offset || 0;
  if (isNaN(offset) || offset < 0) {
    offset = 0;
  }
  //Search for User
  //TODO add followers and stats
  let user_list = await User.findAll({
    attributes: ["id", "username", "avatar"],
    limit: DB_LIMIT,
    offset: offset * DB_LIMIT,
  });
  user_list.forEach((user) => {
    if (user.avatar === null) {
      user.avatar = "default.jpg";
    }
  });

  //Count all Lessons with at least 1 Word
  let total = await User.count();
  res.status(200).json({ userList: user_list, total });
});

const viewUserSearch = asyncHandler(async (req, res) => {
  let { search_name } = req.body;
  if (!search_name) {
    res.status(400);
    throw new Error("Please enter a username");
  }

  let offset = req.params.offset || 0;
  if (isNaN(offset) || offset < 0) {
    offset = 0;
  }

  let [user_list, total] = await Promise.all([
    User.findAll({
      attributes: ["id", "username", "avatar"],
      where: {
        username: {
          [Sequelize.Op.like]: `${search_name}%`,
        },
      },
      limit: DB_LIMIT,
      offset: offset * DB_LIMIT,
    }).then((user_list) => {
      user_list.forEach((user) => {
        if (user.avatar === null) {
          user.avatar = "default.jpg";
        }
      });
      return user_list;
    }),
    User.count({
      where: {
        username: {
          [Sequelize.Op.like]: `${search_name}%`,
        },
      },
    }),
  ]);

  res.status(200).json({ userList: user_list, total });
});

module.exports = {
  viewLesson,
  viewLessons,
  getQuiz,
  submitQuiz,
  showResults,
  showUser,
  changeUserProfile,
  changeUserPassword,
  changeUserAvatar,
  fetchUserAvatar,
  showDashboardWords,
  showDashboardLessons,
  viewUserList,
  viewUserSearch,
};
