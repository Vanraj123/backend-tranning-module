"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PermissionModule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PermissionModule.init(
    {
      module_code: DataTypes.STRING,
      module_description: DataTypes.STRING,
      is_active: DataTypes.BOOLEAN,
      created_by: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "PermissionModule",
    }
  );
  return PermissionModule;
};
