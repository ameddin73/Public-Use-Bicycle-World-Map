'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: DataTypes.STRING,
        external_id: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true,
            },
        },
        role: DataTypes.STRING
    }, {});
    User.associate = function (models) {
        // associations can be defined here
    };
    return User;
};