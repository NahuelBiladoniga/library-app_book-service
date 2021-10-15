'use strict';

const {hashSync} = require("bcryptjs");
module.exports = {
    up: async (queryInterface, Sequelize) => {
        const {hashSync} = require("bcryptjs");
        await queryInterface.bulkInsert('Users', [
            {
                name: 'Admin',
                email: 'admin@ort.com',
                password: hashSync('Password1', 10),
                organizationName: 'ORT',
                roles: 'admin,'
            },
            {
                name: 'Alumno',
                email: 'alumno@ort.com',
                password: hashSync('Password1', 10),
                organizationName: 'ORT',
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
                            'admin@ort.com',
                            'alumno@ort.com',
                        ]
                    }
            })
    }
};
