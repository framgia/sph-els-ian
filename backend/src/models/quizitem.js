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
      QuizItem.belongsTo(Quiz);
      QuizItem.belongsTo(Word);
    }
  }
  QuizItem.init(
    {
      isCorrect: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "QuizItem",
    }
  );
  return QuizItem;
};
