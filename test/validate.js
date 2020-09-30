/**
 * File for performing tests on the '/validate' route
 */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/index');

chai.should();
chai.use(chaiHttp);

//Setup env variables
process.env.NODE_ENV = 'test';
process.env.DEVTOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJMaWdodCBCcmluZ2VyIiwibmFtZSI6IkxpdHRsZXBpcCIsImlhdCI6MTU5OTc2OTkxOCwiZGV2Ijp0cnVlfQ.u5zBnSSrU20fsjYEi3OZzLnJRbvYbG837dUiiKryOE0';
process.env.DB_TYPE = 'sqlite3';
process.env.SQLITE_FILE = 'test.sqlite';

const validJWT = `token=${process.env.DEVTOKEN}`;
const invalidJWT = 'token=derp';

describe('Testing the /validate route of the API', function () {
    before(function (done) {
        chai.request(server)
            .get('/api/auth/get-csrf-token')
            .end((err, res) => {
                this.csrfCookie = res.headers['set-cookie'] || ['derp'];
                this.csrfCookie = this.csrfCookie[0];
                this.csrfToken = res.body.csrfToken;
                done();
            });
    });
    describe('Testing GET /validate/avilableWeeks', function () {
        describe('Testing status code 200 for GET /validate/avilableWeeks', function () {
            before(function (done) {
                chai.request(server)
                    .get('/api/validate/avilableWeeks')
                    .set('Cookie', `${this.csrfCookie};${validJWT}`)
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

            it('the data should be an array', function () {
                this.res.body.data.should.be.a('array');
            });
        });
        describe('Testing status code 401 for GET /validate/avilableWeeks', function () {
            before(function (done) {
                chai.request(server)
                    .get('/api/validate/avilableWeeks')
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
        describe('Testing status code 403 for GET /validate/avilableWeeks', function () {
            before(function (done) {
                chai.request(server)
                    .get('/api/validate/avilableWeeks')
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

    describe('Testing GET /validate/populatedWeeks', function () {
        describe('Testing status code 200 for GET /validate/populatedWeeks', function () {
            before(function (done) {
                chai.request(server)
                    .get('/api/validate/populatedWeeks')
                    .set('Cookie', `${this.csrfCookie};${validJWT}`)
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

            it('the data should be an array', function () {
                this.res.body.data.should.be.a('array');
            });
        });
        describe('Testing status code 401 for GET /validate/populatedWeeks', function () {
            before(function (done) {
                chai.request(server)
                    .get('/api/validate/populatedWeeks')
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
        describe('Testing status code 403 for GET /validate/populatedWeeks', function () {
            before(function (done) {
                chai.request(server)
                    .get('/api/validate/populatedWeeks')
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
