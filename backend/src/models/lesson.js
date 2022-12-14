"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const { Quiz, Word } = models;
      Lesson.hasMany(Quiz, { foreignKey: "lesson_id" });
      Lesson.hasMany(Word, { foreignKey: "lesson_id" });
    }
  }
  Lesson.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Lesson",
    }
  );
  return Lesson;
};
