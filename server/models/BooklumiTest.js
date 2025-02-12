/* models/BooklumiTest.js */

/* 독자 유형을 저장하는 모델 */ 

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const BooklumiTest = sequelize.define("BooklumiTest", {
    userId: { type: DataTypes.INTEGER, allowNull: true }, 
    
    bookType: { type: DataTypes.STRING, allowNull: true },  // 도서 카테고리명 
    categoryID: {type:DataTypes.INTEGER, allowNull: true},  // 도서 카테고리 ID 
    readerType: { type: DataTypes.STRING, allowNull: true } // 독자 유형});
});

module.exports = BooklumiTest;