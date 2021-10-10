'use strict';

const {DataTypes} = require("sequelize");
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Reservations',
            {
                id: {
                    "type": "INTEGER",
                    "allowNull": false,
                    "primaryKey": true,
                    "autoIncrement": true
                },
                userEmail: {
                    type: "VARCHAR(256)",
                    allowNull: false,
                },
                organizationName: {
                    type: "VARCHAR(256)",
                    allowNull: false,
                },
                bookId: {
                    type: "INTEGER",
                    allowNull: false,
                },
                startDate: Sequelize.DATEONLY,
                endDate: Sequelize.DATEONLY
            }
        )
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Reservations')
    }
};
