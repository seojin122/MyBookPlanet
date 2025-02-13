'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable], config)
  : new Sequelize(config.database, config.username, config.password, config);

// ✅ Sequelize 모델을 올바르게 불러오기
fs.readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach(file => {
    const modelClass = require(path.join(__dirname, file));
    
    // ✅ 클래스 기반인지 함수형인지 구분하여 처리
    const model = typeof modelClass === 'function' && modelClass.prototype instanceof Sequelize.Model
      ? modelClass.init(sequelize, Sequelize.DataTypes)
      : modelClass(sequelize, Sequelize.DataTypes);

    // ✅ model.name이 존재하는 경우만 db 객체에 추가
    if (model && model.name) {
      db[model.name] = model;
    }
  });

// ✅ 모델 간 관계 설정
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
