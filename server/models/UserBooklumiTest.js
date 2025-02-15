module.exports = (sequelize, DataTypes) => {
    const UserBooklumiTest = sequelize.define('UserBooklumiTest', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
            model: 'users',
            key: 'id',
            },
        },
        booklumiTestId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
            model: 'booklumi_tests',
            key: 'id',
            },
        },
        });
    return UserBooklumiTest;
};
