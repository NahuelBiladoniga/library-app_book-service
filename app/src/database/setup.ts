import {getDBConfig} from "../utils/environment";

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const config = getDBConfig()
const db: any = {}

let sequelize: any = new Sequelize(config.database, config.username, config.password, config)


// This is to read all the models and load them on memory to avoid delays.
fs
    .readdirSync(path.join(__dirname, 'models'))
    .filter((file: string) => {
        return file.indexOf('.') !== 0 && file !== basename // Not hidden or not ".ts" files.
    })
    .forEach((file: string) => {
        // Realize the import, this is the operation that takes too long.
        const model = require(path.join(__dirname, 'models', file))(sequelize, Sequelize.DataTypes)
        db[model.name] = model
    })

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
