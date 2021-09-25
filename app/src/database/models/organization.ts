import {Model} from 'sequelize'
import {compare} from 'bcryptjs'

interface OrganizationAttributes {
    name: string
    apiToken: string
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Organization extends Model<OrganizationAttributes> implements OrganizationAttributes {
        name!: string
        apiToken!: string

        async validApiToken(apiToken: string): Promise<boolean> {
            return await compare(apiToken, this.apiToken)
        }
    }

    Organization.init({
        name: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        apiToken: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Organization'
    })

    return Organization
}
