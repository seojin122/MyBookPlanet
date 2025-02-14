/* models/BooklumiTest.js */

/* 독자 유형을 저장하는 모델 */ 

/*
const { DataTypes } = require("sequelize");
const sequelize = require("../models"); 

const BooklumiTest = sequelize.define("BooklumiTest", {
    userId: { type: DataTypes.INTEGER, allowNull: true }, 
    
    bookType: { type: DataTypes.STRING, allowNull: true },  // 도서 카테고리명 
    categoryID: {type:DataTypes.INTEGER, allowNull: true},  // 도서 카테고리 ID 
    readerType: { type: DataTypes.STRING, allowNull: true } // 독자 유형});
});

module.exports = BooklumiTest;
*/
module.exports = (sequelize, DataTypes) => {
    class BooklumiTest extends sequelize.Sequelize.Model {
      static associate(models) {
        // 필요하다면 다른 모델과 관계를 설정
        // BooklumiTest.belongsTo(models.User, { foreignKey: "userId", as: "user" });
      }
    }
  
    BooklumiTest.init({
      userId: { type: DataTypes.INTEGER, allowNull: true }, 
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
  