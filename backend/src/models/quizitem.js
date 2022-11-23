"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class QuizItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const { Quiz, Word } = models;
      QuizItem.belongsTo(Quiz, { foreignKey: "quiz_id" });
      QuizItem.belongsTo(Word, { foreignKey: "word_id" });
    }
  }
  QuizItem.init(
    {
      isCorrect: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "QuizItem",
    }
  );
  return QuizItem;
};
