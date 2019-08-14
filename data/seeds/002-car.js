exports.seed = function(knex) {
  return knex('cars').insert([
    {
      user_id: 1,
      make: 'Tesla',
      model: 'Model 3',
      year: 2019,
      active: 1
    },
    {
      user_id: 2,
      make: 'Skoda',
      model: 'Octvia SE',
      year: 2018,
      active: 1
    }
  ]);
};
