'use strict';

const {hashSync} = require("bcryptjs");
module.exports = {
    up: async (queryInterface, Sequelize) => {
        const {hashSync} = require("bcryptjs");
        await queryInterface.bulkInsert('Users', [
            {
                name: 'Santiago Toscanini',
                email: 'santi@library.com',
                password: hashSync('secret-pass', 10),
                organizationName: 'Aulas',
                roles: 'admin,'
            },
            {
                name: 'Sofia Tejerina',
                email: 'lorem@ipsum.com',
                password: hashSync('dolor_sit_amet', 10),
                organizationName: 'Aulas',
                roles: 'normal,'
            }
        ], {})
    },
    down: async (queryInterface, Sequelize) => {
        const {Op} = require("sequelize");
        await queryInterface.bulkDelete(
            'Users',
            {
                email:
                    {
                        [Op.or]: [
                            'santi@library.com',
                            'lorem@ipsum.com',
                        ]
                    }
            })
    }
};
