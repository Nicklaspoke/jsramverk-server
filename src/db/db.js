/**
 * Module to initilize the knex instance
 */
const config = require('./config');
module.exports = require('knex')(config());
