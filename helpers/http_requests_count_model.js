const db = require('../data/dbConfig.js');

module.exports = {
  findAll,
  findBy,
  findById,
  add,
  getCount,
};

function findAll() {
  return db('http_requests_count').select('id', 'GET', 'POST', 'PUT', 'DELETE');
}

function findBy(filter) {
  return db('http_requests_count').where(filter);
}

function findById(id) {
  return db('http_requests_count')
    .where({ id })
    .first();
}

async function add(count) {
  const [id] = await db('http_requests_count').insert(count);

  return findById(id);
}

function update(id, changes) {
  return db('http_requests_count')
    .where({ id })
    .update(changes)
    .then(count => {
      if (count > 0) {
        return findById(id);
      } else {
        return null;
      }
    });
}

function getCount() {
  return db('http_requests_count')
    .count('GET', { as: 'get_count' })
    .count('POST', { as: 'post_count' })
    .count('PUT', { as: 'put_count' })
    .count('DELETE', { as: 'delete_count' })
    .first();
}
