/**
 *
 * @param {int} status http status code for the error
 * @param {string} title the title ofd the error
 * @param {string} description detailed description of the error
 */
module.exports = genError = (status, title, description) => {
    return {
        error: {
            status: status,
            title: title,
            description: description,
        },
    };
};
