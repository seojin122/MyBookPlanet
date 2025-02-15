const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Comment extends Model {
    static associate(models) {
      // 댓글은 하나의 사용자에게 속함
      Comment.belongsTo(models.User, { foreignKey: "userId", as: "user", onDelete: "CASCADE" });
      // 댓글은 하나의 게시글에 속함
      Comment.belongsTo(models.Post, { foreignKey: "postId", as: "post", onDelete: "CASCADE" });
      // 대댓글을 위한 자기 참조 관계 설정
      Comment.belongsTo(models.Comment, { foreignKey: "parentId", as: "parentComment", onDelete: "CASCADE" });
      Comment.hasMany(models.Comment, { foreignKey: "parentId", as: "replies", onDelete: "CASCADE" });
    }
  }

  Comment.init(
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: true, // 대댓글일 경우만 사용
      },
    },
    {
      sequelize,
      modelName: "Comment",
      tableName: "comments",
      timestamps: true,
    }
  );

  return Comment;
};
