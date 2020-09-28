/**
 * File for performing tests on the '/register' route
 */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/index');
const db = require('../src/db/db');

chai.should();
chai.use(chaiHttp);

//Setup env variables
process.env.NODE_ENV = 'test';
process.env.DB_TYPE = 'sqlite3';
process.env.SQLITE_FILE = 'test.sqlite';

describe('Test the /register route of the API', function () {
    before(function (done) {
        chai.request(server)
            .get('/api/auth/get-csrf-token')
            .end((err, res) => {
                this.csrfCookie = res.headers['set-cookie'][0];
                this.csrfToken = res.body.csrfToken;
                done();
            });
    });
    after(function (done) {
        db('user')
            .del()
            .where({ email: 'admin@admin.com' })
            .then(() => done());
    });
    describe('Testing status code 201 for POST /register', function () {
        before(function (done) {
            chai.request(server)
                .post('/api/auth/register')
                .set('Cookie', this.csrfCookie)
                .set('X-CSRF-Token', this.csrfToken)
                .set('Content-Type', 'application/json')
                .send({ email: 'admin@admin.com', password: 'password123' })
                .end((err, res) => {
                    this.err = err;
                    this.res = res;
                    done();
                });
        });

        it('should have a status code of 201', function () {
            this.res.should.have.status(201);
        });

        it('should have a message in the body that reads Account created', function () {
            this.res.body.data.should.be.equal('Account created');
        });
    });

    describe('Testing status code 400 (invalid email address) for POST /register', function () {
        before(function (done) {
            chai.request(server)
                .post('/api/auth/register')
                .set('Cookie', this.csrfCookie)
                .set('X-CSRF-Token', this.csrfToken)
                .set('Content-Type', 'application/json')
                .send({ email: 'a.se', password: 'password123' })
                .end((err, res) => {
                    this.err = err;
                    this.res = res;
                    done();
                });
        });

        it('should have a status code of 400', function () {
            this.res.should.have.status(400);
        });

        it('should contain the keys for the error; status, title, description', function () {
            this.res.body.error.should.have.all.keys('status', 'title', 'description');
        });

        it('should have the value status as a integer', function () {
            this.res.body.error.status.should.be.a('number');
        });

        it('should have the value status with the value 400', function () {
            this.res.body.error.status.should.be.equal(400);
        });

        it('should have the value title as a string', function () {
            this.res.body.error.title.should.be.a('string');
        });

        it('should have the value title with the value Missing Credentials', function () {
            this.res.body.error.title.should.be.equal('Missing Credentials');
        });

        it('should have the value description as a string', function () {
            this.res.body.error.description.should.be.a('string');
        });

        it('should have the value description with the value Invalid email or no password provided', function () {
            this.res.body.error.description.should.be.equal(
                'Invalid email or no password provided',
            );
        });
    });

    describe('Testing status code 400 (user already registered) for POST /register', function () {
        before(function (done) {
            chai.request(server)
                .post('/api/auth/register')
                .set('Cookie', this.csrfCookie)
                .set('X-CSRF-Token', this.csrfToken)
                .set('Content-Type', 'application/json')
                .send({ email: 'admin@admin.se', password: 'password123' })
                .end((err, res) => {
                    this.err = err;
                    this.res = res;
                    done();
                });
        });

        it('should have a status code of 400', function () {
            this.res.should.have.status(400);
        });

        it('should contain the keys for the error; status, title, description', function () {
            this.res.body.error.should.have.all.keys('status', 'title', 'description');
        });

        it('should have the value status as a integer', function () {
            this.res.body.error.status.should.be.a('number');
        });

        it('should have the value status with the value 400', function () {
            this.res.body.error.status.should.be.equal(400);
        });

        it('should have the value title as a string', function () {
            this.res.body.error.title.should.be.a('string');
        });

        it('should have the value title with the value Email already in use', function () {
            this.res.body.error.title.should.be.equal('Email already in use');
        });

        it('should have the value description as a string', function () {
            this.res.body.error.description.should.be.a('string');
        });

        it('should have the value description with the value provided email is already registerd', function () {
            this.res.body.error.description.should.be.equal('provided email is already registerd');
        });
    });
});
