'use strict';
module.exports = (sequelize, DataTypes) => {
    const Sheet = sequelize.define('Sheet', {
        sheet_id: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true,
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
            type: DataTypes.TEXT,
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