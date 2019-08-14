exports.up = function (knex) {
    return knex.schema.createTable('cars', table => {
        table.increments();
        //foreign key linking cars to users.
        table
            .integer('user_id')
            .unsigned()
            .nullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table.string('make', 128).notNullable();
        table.string('model', 128).notNullable();
        table.integer('year', 128).notNullable();
        table.boolean('active').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('cars');
};
