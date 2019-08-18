const db = require('../data/dbConfig.js');

module.exports = {
  findAll,
  findBy,
  findById,
  add,
  remove,
  update,
  getCarsByUser,
  getCarsByMake,
  getCarsCount,
  getActiveCount,
  getInactiveCount
};

function findAll() {
  return db('cars').select(
    'id',
    'user_id',
    'make',
    'model',
    'year',
    'active',
    'created_at'
  );
}

function findBy(filter) {
  return db('cars').where(filter);
}

function findById(id) {
  return db('cars')
    .where({ id })
    .first();
}

async function add(car) {
  const [id] = await db('cars').insert(car);

  return findById(id);
}

async function remove(id) {
  return db('cars')
    .where({ id })
    .delete();
}

function update(id, changes) {
  return db('cars')
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

function getCarsByUser(userId) {
  return db('cars as c')
    .join('users as u', 'u.id', 'c.user_id')
    .select(
      'u.username',
      'c.id',
      'c.make',
      'c.model',
      'c.year',
      'c.active',
      'c.created_at'
    )
    .where('c.user_id', userId);
}

function getCarsByMake(userId, make) {
  return db('cars as c')
    .join('users as u', 'u.id', 'c.user_id')
    .select(
      'u.username',
      'c.id',
      'c.make',
      'c.model',
      'c.year',
      'c.active',
      'c.created_at'
    )
    .where('c.make', make);
}

function getCarsCount() {
  return db('cars')
    .count('id', { as: 'count' })
    .first();
}

function getActiveCount() {
  return db('cars')
    .count('active', { as: 'count' })
    .where('cars.active', 1)
    .first();
}

function getInactiveCount() {
  return db('cars')
    .count('active', { as: 'count' })
    .where('cars.active', 0)
    .first();
}
