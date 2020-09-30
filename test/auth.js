/**
 * File for performing tests on the '/auth' route
 * This includes login, logout, get a csrf token and a auth check (returns 200 or 40x depending on JWT token validility)
 */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/index');

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

describe('Testing the /auth route of the API', function () {
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
    describe('Testing POST /auth/login', function () {
        describe('Testing status code 200 for POST /auth/login', function () {
            before(function (done) {
                chai.request(server)
                    .post('/api/auth/login')
                    .set('Cookie', this.csrfCookie)
                    .set('X-CSRF-Token', this.csrfToken)
                    .set('Content-Type', 'application/json')
                    .send({ email: 'admin@admin.se', password: 'admin' })
                    .end((err, res) => {
                        this.err = err;
                        this.res = res;
                        done();
                    });
            });

            it('should have status code 200', function () {
                this.res.should.have.status(200);
            });

            it('should have a cookie provided in the header', function () {
                this.res.headers['set-cookie'][0].should.be.a('string');
            });

            it("should have a key in it's body named token", function () {
                this.res.body.should.have.all.key('token');
            });

            it('should have a token that is a string', function () {
                this.res.body.token.should.be.a('string');
            });
        });
        describe('Testing status code 400 for POST /auth/login', function () {
            before(function (done) {
                chai.request(server)
                    .post('/api/auth/login')
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

            it('should have the value title with the value Invalid credentials', function () {
                this.res.body.error.title.should.be.equal('Invalid credentials');
            });

            it('should have the value description as a string', function () {
                this.res.body.error.description.should.be.a('string');
            });

            it('should have the value description with the value Login failed; Invalid email or password.', function () {
                this.res.body.error.description.should.be.equal(
                    'Login failed; Invalid email or password.',
                );
            });
        });
    });

    describe('Testing GET /auth/authCheck', function () {
        describe('Testing status code 200 for GET /auth/authCheck', function () {
            before(function (done) {
                chai.request(server)
                    .get('/api/auth/authCheck')
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

            it('should have data with the text Access Granted', function () {
                this.res.body.data.should.be.equal('Access Granted');
            });
        });
        describe('Testing status code 401 for GET /auth/authCheck', function () {
            before(function (done) {
                chai.request(server)
                    .get('/api/auth/authCheck')
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
        describe('Testing status code 403 for GET /auth/authCheck', function () {
            before(function (done) {
                chai.request(server)
                    .get('/api/auth/authCheck')
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

    describe('Testing GET /auth/logout', function () {
        it('should have a status code of 204', function (done) {
            chai.request(server)
                .get('/api/auth/logout')
                .set('Cookie', `${this.csrfCookie}`)
                .set('X-CSRF-Token', this.csrfToken)
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
        });
    });
});
