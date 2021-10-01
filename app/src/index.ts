import {App} from './app'

import sequelize from './database/setup'
import {users} from './database/seeders/users'
import {organizations} from './database/seeders/organizations'

import {User} from './database/models/user.model'

import {isDevEnvironment} from "./utils/environment";
import {Organization} from "./database/models/organization.model";
import {books} from "./database/seeders/books";
import {Book} from "./database/models/book.model";

async function main() {
    const app = new App()
    if (isDevEnvironment()) {
        await sequelize.sync()
        await seedDBWithOrganizations()
        await seedDBWithUsers()
        await seedDBWithBooks()
    }
    await app.listen()
}

async function seedDBWithOrganizations() {
    organizations.map(async org => {
        const organizationFound = await Organization.findByPk(org.name)
        if (!organizationFound) {
            await Organization.create(org)
        }
    })
}

async function seedDBWithUsers() {
    users.map(async user => {
        const userFound = await User.findOne({where: {email: user.email, organizationName: user.organizationName}})
        if (!userFound) {
            await User.create(user)
        }
    })
}

async function seedDBWithBooks() {
    books.map(async book => {
        const bookFound = await Book.findOne({where: {ISBN: book.ISBN, organizationName: book.organizationName}})
        if (!bookFound) {
            await Book.create(book)
        }
    })
}

main()
