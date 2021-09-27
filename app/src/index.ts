import {App} from './app'

import db from './database/setup'
import {users} from './database/seeders/users'
import {isDevEnvironment} from "./utils/environment";

async function main() {
    const app = new App()
    if (isDevEnvironment()) {
        await db.sequelize.sync()
        await seedDbWithUsers()
    }
    await app.listen()
}

async function seedDbWithUsers() {
    users.map(async user => {
        const user_found = await db.User.findByPk(user.email)
        if (!user_found) {
            await db.User.create(user)
        }
    })
}

main()
