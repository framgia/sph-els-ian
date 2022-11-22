"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Quiz extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const { User, QuizItem, Lesson } = models;
      Quiz.belongsTo(User, { foreignKey: "user_id" });
      Quiz.hasMany(QuizItem, { foreignKey: "quiz_id" });
      Quiz.belongsTo(Lesson, { foreignKey: "lesson_id" });
    }
  }
  Quiz.init(
    {
      score: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Quiz",
    }
  );
  return Quiz;
};
