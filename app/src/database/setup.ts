import {getDBConfig} from "../utils/environment";

const Sequelize = require('sequelize')
const config = getDBConfig()

let sequelize;

if(config.database.includes('memory')){
    sequelize = new Sequelize('sqlite::memory:')
    sequelize.sync()
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config)
}

export default sequelize