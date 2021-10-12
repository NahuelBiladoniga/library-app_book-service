import * as chai from 'chai';
import {expect, request} from 'chai';
import 'chai-http';
import {App} from '../src/app'
import {User} from "../src/database/models/user.model";
import {Organization} from "../src/database/models/organization.model";
import sequelize from '../src/database/setup'

chai.use(require('chai-http'));

describe('Login', async function () {
    const app = new App()

    this.beforeAll(async function () {
        app.listen()
        await sequelize.drop()
        await sequelize.sync()
    })

    this.afterAll(function (done) {
        app.close(done)
    })

    before(async function () {
        await Organization.create({
            name: 'Aulas',
            APIToken: '778af6d5-f2eb-43e4-adeb-4530b9d0b6ac'
        })

        await User.create({
            id: 0,
            name: 'Santiago Toscanini',
            email: 'santi@library.com',
            password: 'secret-pass',
            organizationName: 'Aulas',
            roles: 'admin,'
        })
    })

    it("Should fail to authenticate user, invalid user", async function () {
        const res = await request('http://0.0.0.0').post('/login').send({
            email: "santi@notest.com",
            password: "secret-pass",
            organizationName: "Invalid Org"
        });
        expect(res).to.have.status(400);
        expect(res).to.be.a('object');
        expect(res).to.have.property('body');
    });

    it("Should fail to authenticate user, invalid password", async function () {
        const res = await request('http://0.0.0.0').post('/login').send({
            email: "santi@library.com",
            password: "wrong-pass",
            organizationName: "Aulas"
        });
        expect(res).to.have.status(400);
        expect(res).to.be.a('object');
        expect(res).to.have.property('body');
    });

    it("Should authenticate user", async function () {
        const res = await request('http://0.0.0.0').post('/login').send({
            "email": "santi@library.com",
            "password": "secret-pass",
            "organizationName": "Aulas"
        });
        expect(res).to.have.status(200);
        expect(res).to.be.a('object');
        expect(res).to.have.property('body');
    });
});
