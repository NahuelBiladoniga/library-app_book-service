import {DataTypes, Model} from 'sequelize'
import {compare, hashSync} from 'bcryptjs'
import sequelize from '../setup'
import {Organization} from "./organization.model";

export class User extends Model {
    id!: number
    name!: string
    email!: string
    password!: string
    organizationName!: string
    roles!: string

    async validPassword(password: string): Promise<boolean> {
        return await compare(password, this.password)
    }
}

User.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        }
    },
    organizationName: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Organization,
            key: 'name'
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            this.setDataValue<string>('password', hashSync(<string>value, 10))
        },
    },
    roles: DataTypes.STRING,
}, {
    sequelize,
    modelName: 'User'
})
