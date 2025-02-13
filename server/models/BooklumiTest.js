/* 독자 유형을 저장하는 모델 */ 

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // 데이터베이스 연결을 가져옵니다.

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

// 모델을 외부에서 사용할 수 있도록 export
module.exports = BooklumiTest;