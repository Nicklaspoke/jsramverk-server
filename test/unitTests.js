const chai = require('chai');
const path = require('path');
const dbConfig = require(path.join(__dirname, '../src/db/config'));
const errorGen = require(path.join(__dirname, '../src/helpers/error'));
chai.should();

// Setup env variables for the tests

describe('Testing various non router functions', function () {
    describe('Testing retrival of db config object', function () {
        describe('Testing config function for the databasec with sqlite3 as a database', function () {
            before(function () {
                process.env.DB_TYPE = 'sqlite3';
                process.env.SQLITE_FILE = 'test.sqlite';
                this.config = dbConfig();
            });
            it('should have the dbType sqlite3', function () {
                this.config.client.should.be.equal('sqlite3');
            });

            it('should have the correct path to the database file', function () {
                this.config.connection.filename.should.be.equal(
                    path.join(__dirname, '../src/db/test.sqlite'),
                );
            });
        });

        describe('Testing config function for the databasec with mysql as a database', function () {
            before(function () {
                process.env.DB_TYPE = 'mysql';
                process.env.DB_HOST = 'localhost';
                process.env.DB_PORT = '3306';
                process.env.DB_USER = 'admin';
                process.env.DB_PASS = 'admin';
                process.env.DB_NAME = 'jsramverk';
                this.config = dbConfig();
            });

            it('should have the dbType mysql', function () {
                this.config.client.should.be.equal('mysql');
            });

            it('should have the host set to localhost', function () {
                this.config.connection.host.should.be.equal('localhost');
            });

            it('should have the port set to 3306', function () {
                this.config.connection.port.should.be.equal('3306');
            });

            it('should have the user set to admin', function () {
                this.config.connection.user.should.be.equal('admin');
            });

            it('should have the password set to admin', function () {
                this.config.connection.password.should.be.equal('admin');
            });

            it('should have the db name set to jsramverk', function () {
                this.config.connection.database.should.be.equal('jsramverk');
            });
        });

        describe('Testing config function for the database when no env is given', function () {
            before(function () {
                delete process.env.DB_TYPE;
                delete process.env.SQLITE_FILE;
                this.config = dbConfig();
            });

            it('should have the dbType sqlite3', function () {
                this.config.client.should.be.equal('sqlite3');
            });

            it('should have the correct path to the database file', function () {
                this.config.connection.filename.should.be.equal(
                    path.join(__dirname, '../src/db/db.sqlite'),
                );
            });
        });
    });

    describe('Test the function for generating http error messages', function () {
        before(function () {
            this.error = errorGen(
                724,
                'This line should be unreachable',
                'How did you end up here?',
            );
        });
        it('should be a object', function () {
            this.error.should.be.a('object');
        });

        it('should contain the top key error', function () {
            this.error.should.have.all.keys('error');
        });

        it('should contain the sub keys status, title, description', function () {
            this.error.error.should.have.all.keys('status', 'title', 'description');
        });

        it('should have the value status as a integer', function () {
            this.error.error.status.should.be.a('number');
        });

        it('should have the value status with the value 724', function () {
            this.error.error.status.should.be.equal(724);
        });

        it('should have the value title as a string', function () {
            this.error.error.title.should.be.a('string');
        });

        it('should have the value title with the value This line should be unreachable', function () {
            this.error.error.title.should.be.equal('This line should be unreachable');
        });

        it('should have the value description as a string', function () {
            this.error.error.description.should.be.a('string');
        });

        it('should have the value description with the value How did you end up here?', function () {
            this.error.error.description.should.be.equal('How did you end up here?');
        });
    });
});
