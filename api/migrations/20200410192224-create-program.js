'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Programs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      guid: {
        allowNull: false,
        key: true,
        unique: true,
        type: Sequelize.INTEGER
      },
      continent: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      province: {
        type: Sequelize.STRING
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING
      },
      city_local: {
        type: Sequelize.STRING
      },
      municipality: {
        type: Sequelize.STRING
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT
      },
      url: {
        type: Sequelize.STRING
      },
      start_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      end_date: {
        type: Sequelize.DATE
      },
      bike_count: {
        type: Sequelize.INTEGER
      },
      station_count: {
        type: Sequelize.INTEGER
      },
      pedelec_count: {
        type: Sequelize.INTEGER
      },
      cargo_count: {
        type: Sequelize.INTEGER
      },
      latitude: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      longitude: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      map: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Programs');
  }
};