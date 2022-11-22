"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ActivityType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const { Activity } = models;
      ActivityType.hasMany(Activity, { foreignKey: "activity_type" });
    }
  }
  ActivityType.init(
    {
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ActivityType",
    }
  );
  return ActivityType;
};
