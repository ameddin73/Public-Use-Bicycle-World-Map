'use strict';
module.exports = (sequelize, DataTypes) => {
    const Program = sequelize.define('Program', {
        guid: {
            type: DataTypes.STRING,
            allowNull: false,
            key: true,
            unique: true,
            validate: {
                notNull: true,
            }
        },
        continent: {
            type: DataTypes.STRING,
            validate: {
                isIn: [['North America','South America','Africa','Antarctica','Asia','Oceania','Europe','Americas']],
            }
        },
        country: DataTypes.STRING,
        province: DataTypes.STRING,
        city: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true,
            },
        },
        city_local: DataTypes.STRING,
        municipality: DataTypes.STRING,
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true,
            },
        },
        type: {
            type: DataTypes.INTEGER,
            validate: {
                isIn: [[4]],
            },
        },
        status: {
            type: DataTypes.INTEGER,
            validate: {
                isIn: [[1,2,3]],
            },
        },
        description: DataTypes.TEXT,
        url: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true,
            },
        },
        start_date: {
            type: DataTypes.DATE,
            validate: {
                isDate: true,
            },
        },
        end_date: {
            type: DataTypes.DATE,
            validate: {
                isDate: true,
            },
        },
        bike_count: DataTypes.INTEGER,
        station_count: DataTypes.INTEGER,
        pedelec_count: DataTypes.INTEGER,
        cargo_count: DataTypes.INTEGER,
        latitude: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notNull: true,
            },
        },
        longitude: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notNull: true,
            },
        },
        map: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true,
            },
        }
    }, {
        paranoid: true,
    });
    Program.associate = function (models) {
        // associations can be defined here
    };
    return Program;
};