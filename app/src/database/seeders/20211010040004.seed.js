'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Books', [
            {
                ISBN: "978-1942788003",
                title: "The DevOps Handbook",
                author: "Gene Kim, Jez Humble, Patric Debois & John Willis",
                year: 2016,
                imagePath: "https://images-na.ssl-images-amazon.com/images/I/81B4f4soNAL.jpg",
                organizationName: "ORT",
            },
        ], {})
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete(
            'Books',
            {
                title: "The DevOps Handbook",
                organizationName: "ORT",
            }
        )
    }
};
