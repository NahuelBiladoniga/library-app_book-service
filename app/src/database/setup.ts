import {getDBConfig} from "../utils/environment";

const Sequelize = require('sequelize')
const config = getDBConfig()

export default new Sequelize(config.database, config.username, config.password, config)
