import * as chai from 'chai';
import {expect, request} from 'chai';
import 'chai-http';
import {App} from '../src/app'
import LoginService from "../src/services/login.service";
import {User} from "../src/database/models/user.model";
import {getRole} from "../src/utils/roles";
import {Organization} from "../src/database/models/organization.model";
import sequelize from '../src/database/setup'
import {createUUID} from '../src/utils/uuid';

chai.use(require('chai-http'));

describe('New API Token ', async function () {
    const app = new App()
    const validToken = createUUID()

    this.beforeAll(async function () {
        app.listen()
        await sequelize.drop()
        await sequelize.sync()
    })

    this.afterAll(function (done) {
        app.close(done)
    })

    let adminAuthToken;
    before(async function () {
        adminAuthToken = LoginService.generateAuthToken(
            User.build(
                {
                    name: "test",
                    email: "test@test.com",
                    password: "pass",
                    organizationName: "Aulas",
                    roles: getRole("admin")
                }
            )
        )
        await Organization.create({name: 'Aulas', APIToken: validToken})
    })

    it("Should generate a valid token", async function () {
        const res = await request('http://0.0.0.0')
            .get('/organizations/Aulas/new-api-token')
            .set('auth-token', adminAuthToken)
            .set('api-token', validToken);
        expect(res).to.have.status(204);
        expect(res).to.have.header('api-token')
    });

    it("Should fail to generate a new token invalid organization", async function () {
        const res = await request('http://0.0.0.0').get('/organizations/InvalidOrg/new-api-token');
        expect(res).to.have.status(401);
        expect(res).to.be.a('object');
        expect(res).to.have.property('body');
    });

    it("Should fail to generate a new token without auth-token", async function () {
        const res = await request('http://0.0.0.0').get('/organizations/Aulas/new-api-token');
        expect(res).to.have.status(401);
        expect(res).to.be.a('object');
        expect(res).to.have.property('body');
    });

    it("Should fail to generate a token without api-token", async function () {
        const res = await request('http://0.0.0.0')
            .get('/organizations/Aulas/new-api-token')
            .set('auth-token', adminAuthToken);
        expect(res).to.have.status(401);
        expect(res).to.be.a('object');
        expect(res).to.have.property('body');
    });

    it("Should fail to generate a token with invalid api-token", async function () {
        const res = await request('http://0.0.0.0')
            .get('/organizations/Aulas/new-api-token')
            .set('auth-token', adminAuthToken)
            .set('api-token', '14fa5945-ba31-43c6-a16q-bf41978fd1a6');
        expect(res).to.have.status(400);
        expect(res).to.be.a('object');
        expect(res).to.have.property('body');
    });

    describe('User Api Token', function newFunction() {
        let userAuthToken;
        before(async function () {
            userAuthToken = LoginService.generateAuthToken(
                User.build(
                    {
                        name: "test",
                        email: "test@test.com",
                        password: "pass",
                        organizationName: "Aulas",
                        roles: getRole("normal")
                    }
                )
            );
        });

        it("Should fail to generate a new token with invalid auth-token", async function () {
            const res = await request('http://0.0.0.0').get('/organizations/Aulas/new-api-token').set('auth-token', userAuthToken);
            expect(res).to.have.status(403);
            expect(res).to.be.a('object');
            expect(res).to.have.property('body');
        });
    });

    describe('Auth Token invalid', function a() {
        let authTokenWithWrongOrganization;
        before(function () {
            authTokenWithWrongOrganization = LoginService.generateAuthToken(
                User.build(
                    {
                        name: "test",
                        email: "test@test.com",
                        password: "pass",
                        organizationName: "organizationTest",
                        roles: getRole("admin")
                    }
                )
            );
        });
        it("Should fail to generate a new token with auth-token that not match with organization", async function () {
            const res = await request('http://0.0.0.0').get('/organizations/Aulas/new-api-token').set('auth-token', authTokenWithWrongOrganization);
            expect(res).to.have.status(400);
            expect(res).to.be.a('object');
            expect(res).to.have.property('body');
        });
    });
});
