import {DataTypes, Model} from 'sequelize'
import sequelize from '../setup'


export class Organization extends Model {
    name!: string
    APIToken!: string
}

Organization.init({
    name: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    APIToken: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Organization'
})
