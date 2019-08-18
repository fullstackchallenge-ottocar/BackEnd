exports.seed = function(knex) {
    return knex('http_requests_count').insert([
      {
        GET: 1
      },
      {
        POST: 1
      },
      {
        PUT: 1
      },
      {
        DELETE: 1
      },
    ]);
  };
  