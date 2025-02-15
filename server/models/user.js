// const { Model, DataTypes } = require("sequelize");

// class User extends Model {
//   static init(sequelize) { // ✅ initiate → init 변경
//     return super.init({
//       email: {
//         type: DataTypes.STRING(40),
//         allowNull: true,
//         unique: true,
//       },
//       nick: {
//         type: DataTypes.STRING(15),
//         allowNull: false,
//       },
//       password: {
//         type: DataTypes.STRING(100),
//         allowNull: true,
//       },
//       provider: {
//         type: DataTypes.ENUM('local', 'kakao'),
//         allowNull: false,
//         defaultValue: 'local',
//       },
//       snsId: {
//         type: DataTypes.STRING(30),
//         allowNull: true,
//       },
//     }, {
//       sequelize,
//       timestamps: true,
//       underscored: false,
//       modelName: 'User',
//       tableName: 'users',
//       paranoid: true,
//       charset: 'utf8',
//       collate: 'utf8_general_ci',
//     });
//   }

//   static associate(db) {
//     db.User.hasMany(db.Post, { foreignKey: 'userId', as: 'Posts' });

//     db.User.belongsToMany(db.User, {
//       foreignKey: 'followingId',
//       as: 'Followers',
//       through: 'Follow',
//     });
//     db.User.belongsToMany(db.User, {
//       foreignKey: 'followerId',
//       as: 'Followings',
//       through: 'Follow',
//     });
//     db.User.hasMany(db.Like, { foreignKey: "userId", as: "likes" });

//   }
// }

// module.exports = User;


//0216 은경 수정
const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static init(sequelize) {
    return super.init({
      email: {
        type: DataTypes.STRING(40),
        allowNull: true,
        unique: true,
      },
      nick: {  // ✅ 닉네임 필드
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      provider: {
        type: DataTypes.ENUM('local', 'kakao'),
        allowNull: false,
        defaultValue: 'local',
      },
      snsId: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.User.hasMany(db.Post, { foreignKey: 'userId', as: 'Posts' });

    // ✅ 팔로잉/팔로워 관계 추가
    db.User.belongsToMany(db.User, {
      foreignKey: 'followingId',
      as: 'Followers',
      through: 'Follow',
    });
    db.User.belongsToMany(db.User, {
      foreignKey: 'followerId',
      as: 'Followings',
      through: 'Follow',
    });

    db.User.hasMany(db.Like, { foreignKey: "userId", as: "likes" });
  }
}

module.exports = User;

