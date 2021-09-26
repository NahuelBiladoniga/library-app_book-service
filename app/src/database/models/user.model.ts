import {CreateOptions, Model} from 'sequelize'
import {compare, hash} from 'bcryptjs'

interface UserAttributes {
    name: string
    email: string
    password: string
    organizationName: string
    roles: string
}

module.exports = (sequelize: any, DataTypes: any) => {
    class User extends Model<UserAttributes> implements UserAttributes {
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
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        organizationName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        roles: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'User'
    })

    User.beforeCreate(async (user: User, options: CreateOptions<UserAttributes>) => {
        return await hash(user.password, 10)
            .then(hash => {
                user.password = hash
            })
            .catch(err => {
                throw new Error(err)
            })
    })

    return User
}
