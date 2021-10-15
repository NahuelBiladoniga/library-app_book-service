'use strict';

const {Op} = require("sequelize");
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Organizations', [
            {
                name: 'ORT',
                APIToken: '778af6d5-f2eb-43e4-adeb-4530b9d0b6ac'
            },
        ], {})
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete(
            'Organizations',
            {
                name: "ORT",
            }
        )
    }
};
