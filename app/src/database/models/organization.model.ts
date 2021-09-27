import {Model} from 'sequelize'

interface OrganizationAttributes {
    name: string
    APIToken: string
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Organization extends Model<OrganizationAttributes> implements OrganizationAttributes {
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

    return Organization
}
