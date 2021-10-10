'use strict';

const {DataTypes} = require("sequelize");
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Users',
            {
                id: {
                    "type": "INTEGER",
                    "allowNull": false,
                    "primaryKey": true,
                    "autoIncrement": true
                },
                email: {
                    type: "VARCHAR(256)",
                    allowNull: false,
                },
                organizationName: {
                    type: "VARCHAR(256)",
                    allowNull: false,
                    references: {
                        model: "Organizations",
                        key: 'name'
                    }
                },
                name: {
                    type: "VARCHAR(256)",
                    allowNull: false,
                },
                password: {
                    type: "VARCHAR(256)",
                    allowNull: false
                },
                roles: "VARCHAR(256)"
            }
        )
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Users')
    }
};
