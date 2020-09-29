/**
 * Returns a knex config object depending on selected database in the Envirioment
 * currently only supports sqlite3 and mysql
 */
const path = require('path');
const getClient = () => {
    const config = {
        sqlite3: {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, process.env.SQLITE_FILE),
            },
        },
        mysql: {
            client: 'mysql',
            connection: {
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_NAME,
            },
        },
    };

    return config[process.env.DB_TYPE];
};

module.exports = getClient;
