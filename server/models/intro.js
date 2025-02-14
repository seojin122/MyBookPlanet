const Sequelize = require('sequelize');

class Intro extends Sequelize.Model {
  static initiate(sequelize) {
    Intro.init({
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Intro',
      tableName: 'intros',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.Intro.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
  }
};

module.exports = Intro;
