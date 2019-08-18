exports.up = function (knex) {
  return knex.schema.createTable('http_requests_count', table => {
    table.increments();
    table.integer('GET', 128).unique().nullable();
    table.integer('POST', 128).nullable();
    table.integer('PUT', 128).nullable();
    table.integer('DELETE', 128).nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('http_requests_count');
};
