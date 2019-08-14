
exports.seed = function(knex, Promise) {
  // the 00-cleanup.js seed already deleted all records
  // we just worry about seeding records in all other seeds
      // Inserts seed entries
      return knex('users').insert([
        { username: 'Fares', 
          password: 'test',
          email: 'fares@ottocar.com',
        },
        { username: 'Novina', 
          password: 'test',
          email: 'novina@ottocar.com',
        }
      ]);
};
