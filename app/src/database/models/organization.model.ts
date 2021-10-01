import {DataTypes, Model} from 'sequelize'

import sequelize from '../setup'


export class Organization extends Model {
    name!: string
    APIToken: string
}

Organization.init({
    name: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    APIToken: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            isUUID: 4,
        },
    }
}, {
    sequelize,
    modelName: 'Organization'
})
