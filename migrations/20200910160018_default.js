/**
 * Migration file for exporting user table into the database
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('user', function (table) {
            table.increments('id');
            table.string('email').notNullable().unique();
            table.string('password').notNullable();
        })
        .createTable('report', function (table) {
            table.integer('week').unique().notNullable();
            table.string('titel', 50).notNullable().unique();
            table.string('content', 2000);
        });
};

exports.down = function (knex) {
    return knex.schema.dropTable('user').dropTable('report');
};
