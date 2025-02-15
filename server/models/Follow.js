const { Model, DataTypes } = require("sequelize");

class Follow extends Model {
  static init(sequelize) {
    return super.init({}, { 
      sequelize, 
      timestamps: true, 
      modelName: 'Follow', 
      tableName: 'Follow', 
      charset: 'utf8', 
      collate: 'utf8_general_ci' 
    });
  }
}

module.exports = Follow;