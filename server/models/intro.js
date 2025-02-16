const Sequelize = require('sequelize');

class Intro extends Sequelize.Model {
  static initiate(sequelize) {
    super.init(
      {
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Intro',
        tableName: 'intros',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.Intro.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
  }
}

// ✅ models/index.js에서 함수형 모델처럼 사용할 수 있도록 변경
module.exports = (sequelize) => {
  Intro.initiate(sequelize); // Sequelize 인스턴스를 전달하여 모델 초기화
  return Intro; // 초기화된 모델 반환
};
