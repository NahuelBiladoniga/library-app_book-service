module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', {
                name: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                email: {
                    type: Sequelize.STRING,
                    primaryKey: true
                },
                password: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                organizationName: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                roles: {
                    type: Sequelize.STRING
                }
            }
        )
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Users')
    }
}
