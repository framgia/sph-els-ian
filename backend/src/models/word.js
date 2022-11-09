"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Word extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const { Lesson, QuizItem, Choice } = models;
      Word.belongsTo(Lesson, { foreignKey: "lesson_id" });
      Word.hasMany(QuizItem, { foreignKey: "word_id" });
      Word.hasMany(Choice, { foreignKey: "word_id" });
    }
  }
  Word.init(
    {
      jp_word: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Word",
    }
  );
  return Word;
};
