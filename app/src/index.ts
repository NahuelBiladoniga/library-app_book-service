import {App} from './app'

import sequelize from './database/setup'
import {users} from './database/seeders/users'
import {organizations} from './database/seeders/organizations'

import {User} from './database/models/user.model'

import {isDevEnvironment} from "./utils/environment";
import {Organization} from "./database/models/organization.model";

async function main() {
    const app = new App()
    if (isDevEnvironment()) {
        await sequelize.sync()
        await seedDbWithOrganizations()
        await seedDbWithUsers()
    }
    await app.listen()
}

async function seedDbWithOrganizations() {
    organizations.map(async org => {
        const organizationFound = await Organization.findByPk(org.name)
        if (!organizationFound) {
            await Organization.create(org)
        }
    })
}

async function seedDbWithUsers() {
    users.map(async user => {
        const user_found = await User.findOne({where: {email: user.email, organizationName: user.organizationName}})
        if (!user_found) {
            await User.create(user)
        }
    })
}

main()
