import * as chai from 'chai';
import {expect, request} from 'chai';
import 'chai-http';
import {App} from '../src/app'

chai.use(require('chai-http'));

const app = new App()

app.listen()

describe('New API Token ', async function () {
    describe("GET /organizations/Aulas/new-api-token", async function () {
        it("Should generate a new token", async function () {
            const res = await request('http://0.0.0.0').get('/organizations/Aulas/new-api-token');
            expect(res).to.have.status(401);
            expect(res).to.be.a('object');
            expect(res).to.have.property('body');
        });
    })
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            chai.assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});
