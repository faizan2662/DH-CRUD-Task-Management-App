const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const Task = require('../models/Task');

chai.should();
chai.use(chaiHttp);

describe('Task Management Tests', () => {
    let token;
    let taskId;

    // Before each test, log in and get a valid token
    before(done => {
        chai.request(server)
            .post('/api/login')
            .send({ username: 'testuser', password: 'testpassword' })
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    });

    // Test for creating a task
    it('should create a new task', done => {
        chai.request(server)
            .post('/api/tasks')
            .set('Authorization', token)
            .send({
                description: 'Test task',
                dueDate: '2024-10-10',
                priority: 'High',
                category: 'Work'
            })
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('description').eql('Test task');
                taskId = res.body._id;
                done();
            });
    });

    // Test for fetching all tasks
    it('should fetch all tasks', done => {
        chai.request(server)
            .get('/api/tasks')
            .set('Authorization', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.above(0);
                done();
            });
    });

    // Test for updating a task
    it('should update a task', done => {
        chai.request(server)
            .put(`/api/tasks/${taskId}`)
            .set('Authorization', token)
            .send({ description: 'Updated task' })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('description').eql('Updated task');
                done();
            });
    });

    // Test for deleting a task
    it('should delete a task', done => {
        chai.request(server)
            .delete(`/api/tasks/${taskId}`)
            .set('Authorization', token)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});
