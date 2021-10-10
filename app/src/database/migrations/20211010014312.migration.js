'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Organizations',
            {
                name: {
                    type: "VARCHAR(255)",
                    primaryKey: true,
                },
                APIToken: {
                    type: "UUID",
                    allowNull: false,
                }
            }
        )
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Organizations')
    }
};
