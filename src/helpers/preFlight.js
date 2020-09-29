/**
 * Module for helping with preflight checks of the server
 * Checks checks if ENVs is set and if not it will default them to certain values
 */

/**
 * Object containing all env names and theier default values
 */
const preFlightValues = [
    { envName: 'NODE_ENV', default: 'development' },
    { envName: 'PORT', default: '8080' },
    { envName: 'JWTSECRET', default: 'devMode' },
    { envName: 'DB_TYPE', default: 'sqlite3' },
    { envName: 'SQLITE_FILE', default: 'db.sqlite' },
    { envName: 'DB_HOST', default: 'localhost' },
    { envName: 'DB_PORT', default: '3306' },
    { envName: 'DB_USER', default: 'admin' },
    { envName: 'DB_PASS', default: 'admin' },
    { envName: 'DB_NAME', default: 'jsramverk' },
];
/**
 * Takes the env that are read in and checks if they are set
 */
const preFlight = () => {
    console.info('Starting pre-fligth check');
    preFlightValues.forEach((env) => {
        if (!process.env[env.envName]) {
            console.info(
                `Missing env ${env.envName} in the envirioment, defaulting it's value to: '${env.default}'`,
            );
            process.env[env.envName] = env.default;
        }
    });

    console.log(`Server starting with the following ENV set:`);
    preFlightValues.forEach((env) => {
        console.info(`${env.envName}: ${process.env[env.envName]}`);
    });
    console.info('Pre-flight check done');
};

module.exports = preFlight;
