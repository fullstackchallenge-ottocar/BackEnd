exports.up = function (knex, Promise) {
  return knex.schema.createTable('http_requests_count', table => {
    table.increments();
    table.int('GET', 128).unique().Nullable();
    table.int('POST', 128).Nullable();
    table.int('PUT', 128).Nullable();
    table.int('DELETE', 128).Nullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('http_requests_count');
};
