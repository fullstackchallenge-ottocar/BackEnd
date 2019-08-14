exports.up = function (knex) {
  return knex.schema.createTable('http_requests_count', table => {
    table.increments();
    table.int('GET', 128).unique().nullable();
    table.int('POST', 128).nullable();
    table.int('PUT', 128).nullable();
    table.int('DELETE', 128).nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('http_requests_count');
};
