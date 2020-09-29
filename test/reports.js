/**
 * File for performing tests on the '/reports' route
 */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/index');
const db = require('../src/db/db');

chai.should();
chai.use(chaiHttp);

//Setup env variables
process.env.NODE_ENV = 'test';
process.env.JWTSECRET = 'lsdlfb90845ejb5409jbEWGREGR0pwjgbjebp093wkb43w5mbp4j5EGRb9p4k5b4poibj';
process.env.DEVTOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJMaWdodCBCcmluZ2VyIiwibmFtZSI6IkxpdHRsZXBpcCIsImlhdCI6MTU5OTc2OTkxOCwiZGV2Ijp0cnVlfQ.u5zBnSSrU20fsjYEi3OZzLnJRbvYbG837dUiiKryOE0';
process.env.DB_TYPE = 'sqlite3';
process.env.SQLITE_FILE = 'test.sqlite';

const validJWT = `token=${process.env.DEVTOKEN}`;
const invalidJWT = 'token=derp';

describe('Testing the /reports route of the API', function () {
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
        const prom1 = new Promise((resolve) => {
            db('report')
                .del()
                .where({ week: 100 })
                .then(() => resolve());
        });

        const prom2 = new Promise((resolve) => {
            db('report')
                .del()
                .where({ week: 1337 })
                .then(() => resolve());
        });

        Promise.all([prom1, prom2]).then(() => done());
    });

    describe('Testing POST /reports', function () {
        describe('Testing status code 201 for POST /reports', function () {
            before(function (done) {
                chai.request(server)
                    .post('/api/reports')
                    .send({ week: 100, title: 'kmom100', content: 'Derpy Hooves;Ditzy Doo' })
                    .set('Cookie', `${this.csrfCookie};${validJWT}`)
                    .set('X-CSRF-Token', this.csrfToken)
                    .end((err, res) => {
                        this.err = err;
                        this.res = res;
                        done();
                    });
            });

            it('should have a status code of 201', function () {
                this.res.should.have.status(201);
            });

            it('should contain the message Report created', function () {
                this.res.body.data.should.be.equal('Report Created');
            });
        });
        describe('Testing status code 400 (week already exists) for POST /reports', function () {
            before(function (done) {
                chai.request(server)
                    .post('/api/reports')
                    .send({ week: 1, title: 'kmom100', content: 'Derpy Hooves;Ditzy Doo' })
                    .set('Cookie', `${this.csrfCookie};${validJWT}`)
                    .set('X-CSRF-Token', this.csrfToken)
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

            it('should have the value title with the value Invalid Week', function () {
                this.res.body.error.title.should.be.equal('Invalid Week');
            });

            it('should have the value description as a string', function () {
                this.res.body.error.description.should.be.a('string');
            });

            it('should have the value description with the value specified week is not valiid or has already a report created', function () {
                this.res.body.error.description.should.be.equal(
                    'specified week is not valiid or has already a report created',
                );
            });
        });
        describe('Testing status code 400 (missing data) for POST /reports', function () {
            before(function (done) {
                chai.request(server)
                    .post('/api/reports')
                    .send({ week: 100, content: 'Derpy Hooves;Ditzy Doo' })
                    .set('Cookie', `${this.csrfCookie};${validJWT}`)
                    .set('X-CSRF-Token', this.csrfToken)
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

            it('should have the value title with the value Missing mandatory parameters', function () {
                this.res.body.error.title.should.be.equal('Missing mandatory parameters');
            });

            it('should have the value description as a string', function () {
                this.res.body.error.description.should.be.a('string');
            });

            it('should have the value description with the value Mandatory parameter week or title are missing', function () {
                this.res.body.error.description.should.be.equal(
                    'Mandatory parameter week or title are missing',
                );
            });
        });
        describe('Testing status code 401 for POST /reports', function () {
            before(function (done) {
                chai.request(server)
                    .post('/api/reports')
                    .set('Cookie', `${this.csrfCookie};${invalidJWT}`)
                    .set('X-CSRF-Token', this.csrfToken)
                    .end((err, res) => {
                        this.err = err;
                        this.res = res;
                        done();
                    });
            });

            it('should have a status code of 401', function () {
                this.res.should.have.status(401);
            });

            it('should contain the keys for the error; status, title, description', function () {
                this.res.body.error.should.have.all.keys('status', 'title', 'description');
            });

            it('should have the value status as a integer', function () {
                this.res.body.error.status.should.be.a('number');
            });

            it('should have the value status with the value 401', function () {
                this.res.body.error.status.should.be.equal(401);
            });

            it('should have the value title as a string', function () {
                this.res.body.error.title.should.be.a('string');
            });

            it('should have the value title with the value Invalid token', function () {
                this.res.body.error.title.should.be.equal('Invalid token');
            });

            it('should have the value description as a string', function () {
                this.res.body.error.description.should.be.a('string');
            });

            it('should have the value description with the value Token invalid or has expired', function () {
                this.res.body.error.description.should.be.equal('Token invalid or has expired');
            });
        });
        describe('Testing status code 403 for POST /reports', function () {
            before(function (done) {
                chai.request(server)
                    .post('/api/reports')
                    .set('Cookie', `${this.csrfCookie}`)
                    .set('X-CSRF-Token', this.csrfToken)
                    .end((err, res) => {
                        this.err = err;
                        this.res = res;
                        done();
                    });
            });

            it('should have a status code of 403', function () {
                this.res.should.have.status(403);
            });

            it('should contain the keys for the error; status, title, description', function () {
                this.res.body.error.should.have.all.keys('status', 'title', 'description');
            });

            it('should have the value status as a integer', function () {
                this.res.body.error.status.should.be.a('number');
            });

            it('should have the value status with the value 403', function () {
                this.res.body.error.status.should.be.equal(403);
            });

            it('should have the value title as a string', function () {
                this.res.body.error.title.should.be.a('string');
            });

            it('should have the value title with the value No token provided', function () {
                this.res.body.error.title.should.be.equal('No token provided');
            });

            it('should have the value description as a string', function () {
                this.res.body.error.description.should.be.a('string');
            });

            it('should have the value description with the value No access token provided in cookie', function () {
                this.res.body.error.description.should.be.equal(
                    'No access token provided in cookie',
                );
            });
        });
    });

    describe('Testing GET /reports/:weekNum', function () {
        describe('Testing status code 200 for GET /reports/week/:weekNum', function () {
            before(function (done) {
                chai.request(server)
                    .get('/api/reports/week/1')
                    .set('Cookie', `${this.csrfCookie}`)
                    .set('X-CSRF-Token', this.csrfToken)
                    .end((err, res) => {
                        this.err = err;
                        this.res = res;
                        done();
                    });
            });

            it('should have a status of 200', function () {
                this.res.should.have.status(200);
            });

            it('should contain the key week, title and content in its body', function () {
                this.res.body.data.should.have.all.keys('week', 'title', 'content');
            });

            it('week should be a number', function () {
                this.res.body.data.week.should.be.a('number');
            });

            it('title should be a string', function () {
                this.res.body.data.title.should.be.a('string');
            });

            it('content should be a string', function () {
                this.res.body.data.content.should.be.a('string');
            });
        });
        describe('Testing status code 404 for GET /reports/week/:weekNum', function () {
            before(function (done) {
                chai.request(server)
                    .get('/api/reports/week/1337')
                    .set('Cookie', `${this.csrfCookie}`)
                    .set('X-CSRF-Token', this.csrfToken)
                    .end((err, res) => {
                        this.err = err;
                        this.res = res;
                        done();
                    });
            });

            it('should have a status code of 404', function () {
                this.res.should.have.status(404);
            });

            it('should contain the keys for the error; status, title, description', function () {
                this.res.body.error.should.have.all.keys('status', 'title', 'description');
            });

            it('should have the value status as a integer', function () {
                this.res.body.error.status.should.be.a('number');
            });

            it('should have the value status with the value 404', function () {
                this.res.body.error.status.should.be.equal(404);
            });

            it('should have the value title as a string', function () {
                this.res.body.error.title.should.be.a('string');
            });

            it('should have the value title with the value Report not found', function () {
                this.res.body.error.title.should.be.equal('Report not found');
            });

            it('should have the value description as a string', function () {
                this.res.body.error.description.should.be.a('string');
            });

            it('should have the value description with the value Could not find a report with the specified week number', function () {
                this.res.body.error.description.should.be.equal(
                    'Could not find a report with the specified week number',
                );
            });
        });
    });

    describe('Testing PUT /reports/:weekNum', function () {
        describe('Testing status code 201 for PUT /reports/weekNum', function () {
            before(function (done) {
                const prom = new Promise((resolve) => {
                    chai.request(server)
                        .post('/api/reports')
                        .send({ week: 420, title: 'Blackjack', content: 'Derpy Hooves;Ditzy Doo' })
                        .set('Cookie', `${this.csrfCookie};${validJWT}`)
                        .set('X-CSRF-Token', this.csrfToken)
                        .end(() => {
                            resolve();
                        });
                });

                prom.then(() => {
                    chai.request(server)
                        .put('/api/reports/week/420')
                        .send({ week: 420, title: 'Littlepip', content: 'Derpy Hooves;Ditzy Doo' })
                        .set('Cookie', `${this.csrfCookie};${validJWT}`)
                        .set('X-CSRF-Token', this.csrfToken)
                        .end((err, res) => {
                            this.err = err;
                            this.res = res;
                            done();
                        });
                });
            });

            it('should have a status of 201', function () {
                this.res.should.have.status(201);
            });

            it('should have a message with the content Report updated', function () {
                this.res.body.data.should.be.equal('Report updated');
            });
        });
        describe('Testing status code 401 for PUT /reports/weekNum', function () {
            before(function (done) {
                chai.request(server)
                    .put('/api/reports/week/420')
                    .set('Cookie', `${this.csrfCookie};${invalidJWT}`)
                    .set('X-CSRF-Token', this.csrfToken)
                    .end((err, res) => {
                        this.err = err;
                        this.res = res;
                        done();
                    });
            });

            it('should have a status code of 401', function () {
                this.res.should.have.status(401);
            });

            it('should contain the keys for the error; status, title, description', function () {
                this.res.body.error.should.have.all.keys('status', 'title', 'description');
            });

            it('should have the value status as a integer', function () {
                this.res.body.error.status.should.be.a('number');
            });

            it('should have the value status with the value 401', function () {
                this.res.body.error.status.should.be.equal(401);
            });

            it('should have the value title as a string', function () {
                this.res.body.error.title.should.be.a('string');
            });

            it('should have the value title with the value Invalid token', function () {
                this.res.body.error.title.should.be.equal('Invalid token');
            });

            it('should have the value description as a string', function () {
                this.res.body.error.description.should.be.a('string');
            });

            it('should have the value description with the value Token invalid or has expired', function () {
                this.res.body.error.description.should.be.equal('Token invalid or has expired');
            });
        });
        describe('Testing status code 403 for PUT /reports/weekNum', function () {
            before(function (done) {
                chai.request(server)
                    .put('/api/reports/week/420')
                    .set('Cookie', `${this.csrfCookie}`)
                    .set('X-CSRF-Token', this.csrfToken)
                    .end((err, res) => {
                        this.err = err;
                        this.res = res;
                        done();
                    });
            });

            it('should have a status code of 403', function () {
                this.res.should.have.status(403);
            });

            it('should contain the keys for the error; status, title, description', function () {
                this.res.body.error.should.have.all.keys('status', 'title', 'description');
            });

            it('should have the value status as a integer', function () {
                this.res.body.error.status.should.be.a('number');
            });

            it('should have the value status with the value 403', function () {
                this.res.body.error.status.should.be.equal(403);
            });

            it('should have the value title as a string', function () {
                this.res.body.error.title.should.be.a('string');
            });

            it('should have the value title with the value No token provided', function () {
                this.res.body.error.title.should.be.equal('No token provided');
            });

            it('should have the value description as a string', function () {
                this.res.body.error.description.should.be.a('string');
            });

            it('should have the value description with the value No access token provided in cookie', function () {
                this.res.body.error.description.should.be.equal(
                    'No access token provided in cookie',
                );
            });
        });
    });
});
