'use strict';

const {DataTypes} = require("sequelize");
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Books',
            {
                id: {
                    "type": "INTEGER",
                    "allowNull": false,
                    "primaryKey": true,
                    "autoIncrement": true
                },
                ISBN: {
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
                isActive: {
                    type: "BOOLEAN",
                    allowNull: false,
                    defaultValue: true,
                },
                title: {
                    type: "VARCHAR(256)",
                    allowNull: false
                },
                author: {
                    type: "VARCHAR(256)",
                    allowNull: false
                },
                year: "INTEGER",
                totalExamples: {
                    type: "INTEGER",
                    defaultValue: 0,
                    allowNull: false,
                },
                imagePath: "VARCHAR(512)"
            }
        )
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Books')
    }
};
