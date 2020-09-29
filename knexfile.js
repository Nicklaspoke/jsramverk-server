const path = require('path');
require('dotenv').config();

module.exports = () => {
    const config = {
        sqlite3: {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, './src/db', process.env.SQLITE_FILE || 'db.sqlite'),
            },
            useNullAsDefault: true,
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
    return process.env.DB_TYPE ? config[process.env.DB_TYPE] : config['sqlite3'];
};
