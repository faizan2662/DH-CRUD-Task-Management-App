// Basic test example
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('Authentication Tests', () => {
    it('should register a user', (done) => {
        chai.request(server)
            .post('/api/register')
            .send({ username: 'testuser', password: 'testpassword' })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
});
