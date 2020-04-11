'use strict';
module.exports = (sequelize, DataTypes) => {
    const Sheet = sequelize.define('Sheet', {
        path: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                isUrl: true,
            }
        },
        service_account_email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                isEmail: true,
            },
        },
        api_key: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true,
            },
        }
    });
    Sheet.associate = function (models) {
        // associations can be defined here
    };
    return Sheet;
};