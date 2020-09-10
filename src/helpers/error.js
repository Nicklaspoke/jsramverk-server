/**
 *
 * @param {int} status http status code for the error
 * @param {string} titel the title ofd the error
 * @param {string} description detailed description of the error
 */
module.exports = genError = (status, titel, description) => {
    return {
        error: {
            status: status,
            titel: titel,
            description: description,
        },
    };
};
