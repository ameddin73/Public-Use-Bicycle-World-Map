'use strict';
module.exports = (sequelize, DataTypes) => {
    const Program = sequelize.define('Program', {
        continent: DataTypes.STRING,
        country: DataTypes.STRING,
        province: DataTypes.STRING,
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city_local: DataTypes.STRING,
        municipality: DataTypes.STRING,
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: DataTypes.INTEGER,
        status: DataTypes.INTEGER,
        description: DataTypes.TEXT,
        url: DataTypes.STRING,
        start_date: DataTypes.DATE,
        end_date: DataTypes.DATE,
        bike_count: DataTypes.INTEGER,
        station_count: DataTypes.INTEGER,
        pedelec_count: DataTypes.INTEGER,
        cargo_count: DataTypes.INTEGER,
        latitude: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        longitude: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        map: DataTypes.STRING
    }, {
        paranoid: true,
    });
    Program.associate = function (models) {
        // associations can be defined here
    };
    return Program;
};