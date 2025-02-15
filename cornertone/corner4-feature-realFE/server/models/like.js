module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define("Like", {
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "posts", key: "id" }
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" }
      }
    }, {
      timestamps: true
    });
  
    return Like;
  };
  