module.exports = (sequelize, DataTypes) => {
  class Post extends sequelize.Sequelize.Model {
    static associate(models) {
      // 게시글은 하나의 사용자에게 속함
      Post.belongsTo(models.User, { foreignKey: "userId", as: "user" });

      // 게시글은 여러 개의 해시태그를 가질 수 있음 (다대다 관계)
      Post.belongsToMany(models.Hashtag, { through: "PostHashtag", as: "hashtags" });
    }
  }

  Post.init({
    bookTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reviewTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: "Post",
    tableName: "posts",
    timestamps: true,
    paranoid: true, // 삭제 시 soft delete 적용
  });

  return Post;
};
