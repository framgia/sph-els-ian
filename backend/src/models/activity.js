"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const { ActivityType, Follow, Quiz, User } = models;
      Activity.belongsTo(User, { foreignKey: "user_id" });
      Activity.belongsTo(Quiz, { foreignKey: "quiz_id" });
      Activity.belongsTo(Follow, { foreignKey: "follow_id" });
      Activity.belongsTo(ActivityType, { foreignKey: "activity_type" });
    }
  }
  Activity.init(
    {
      user_id: DataTypes.INTEGER,
      quiz_id: DataTypes.INTEGER,
      follow_id: DataTypes.INTEGER,
      activity_type: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Activity",
    }
  );
  return Activity;
};
