'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.createTable('users', { id: Sequelize.INTEGER });
        */
        return queryInterface.changeColumn(
            'Programs',
            'start_date',
            {
                allowNull: true,
                type: Sequelize.DATE,
            });
    },

    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.dropTable('users');
        */
        return queryInterface.changeColumn(
            'Programs',
            'start_date',
            {
                allowNull: false,
                type: Sequelize.DATE,
            });
    }
};
