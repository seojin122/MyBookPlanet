/* 독자 유형을 저장하는 모델 */ 

/*
const { DataTypes } = require("sequelize");
const sequelize = require("../models"); 

// booklumitest 모델 정의 (독자 유형을 저장)
const BooklumiTest = sequelize.define('BooklumiTest', {
    userId: { 
        type: DataTypes.INTEGER,  // 사용자 ID (null 가능)
        allowNull: true
    },
    readerType: { 
        type: DataTypes.STRING,  // 독자 유형 (null 가능)
        allowNull: true
    }
});

module.exports = BooklumiTest;
*/

module.exports = (sequelize, DataTypes) => {
    class BooklumiTest extends sequelize.Sequelize.Model {
      static associate(models) {
        // 다대다 관계 설정: BooklumiTest는 여러 User와 연결
        BooklumiTest.belongsToMany(models.User, {
          foreignKey: 'booklumiTestId',
          through: 'user_booklumi_tests',
          as: 'Users',
        });
      }
    }
  
    BooklumiTest.init({
      userId: { type: DataTypes.STRING, allowNull: true }, 
      bookType: { type: DataTypes.STRING, allowNull: true },  
      categoryID: { type: DataTypes.INTEGER, allowNull: true },  
      readerType: { type: DataTypes.STRING, allowNull: true }
    }, {
      sequelize,
      modelName: "BooklumiTest",
      tableName: "booklumi_tests",
      timestamps: true, // createdAt, updatedAt 자동 생성
      paranoid: true, // soft delete (삭제된 데이터 복구 가능)
    });
  
    return BooklumiTest;
  };
  
