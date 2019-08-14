exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', (table) => {
        table.increments();
        table.string('username', 128).unique().notNullable();
        table.string('password', 128).notNullable();
        table.string('email', 128).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
