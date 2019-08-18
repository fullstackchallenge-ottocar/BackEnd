const db = require('../data/dbConfig.js');

module.exports = {
  findAll,
  findBy,
  findById,
  add,
  getGETCount,
  getPOSTCount,
  getPUTCount,
  getDELETECount
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

function getGETCount() {
  return db('http_requests_count')
    .count('GET', { as: 'get_count' })
    .first();
}

function getPOSTCount() {
  return db('http_requests_count')
    .count('POST', { as: 'post_count' })
    .first();
}

function getPUTCount() {
  return db('http_requests_count')
    .count('PUT', { as: 'put_count' })
    .first();
}

function getDELETECount() {
    return db('http_requests_count')
      .count('DELETE', { as: 'delete_count' })
      .first();
  }