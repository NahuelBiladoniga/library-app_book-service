'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addIndex('Reservations', ['organizationName', 'bookId', 'startDate', 'endDate'])
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeIndex('Reservations', ['organizationName', 'bookId', 'startDate', 'endDate'])
    }
};
