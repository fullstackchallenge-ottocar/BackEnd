const db = require('../data/dbConfig.js');
const Cars = require('./cars-model');

const date = new Date().getTime();

describe('cars-model', () => {
  afterEach(async () => {
    await db('cars').truncate();
  });

  describe('findAll', () => {
    it('returns list of all cars in db', async () => {
      await Cars.add({
        user_id: 1,
        make: 'test',
        model: 'test',
        year: 2011,
        active: 1,
        created_at: date
      });

      await Cars.add({
        user_id: 2,
        make: 'test2',
        model: 'test2',
        year: 2011,
        active: 1,
        created_at: date
      });

      const allCars = await Cars.findAll();
      expect(allCars).toHaveLength(2);
    });
  });

  describe('findBy', () => {
    it('returns cars matching filter', async () => {
      await Cars.add({
        user_id: 1,
        make: 'test',
        model: 'test',
        year: 2011,
        active: 1,
        created_at: date
      });

      const car2 = await Cars.add({
        user_id: 2,
        make: 'test2',
        model: 'test2',
        year: 2011,
        active: 1,
        created_at: date
      });

      const filteredSearchByMake = await Cars.findBy({ make: 'test2' }).first();
      expect(filteredSearchByMake).toEqual({
        id: 2,
        user_id: 2,
        make: 'test2',
        model: 'test2',
        year: 2011,
        active: 1,
        created_at: date
      });
    });
  });

  describe('findById', () => {
    it('returns car by userId', async () => {
      await Cars.add({
        user_id: 1,
        make: 'test',
        model: 'test',
        year: 2011,
        active: 1,
        created_at: date
      });

      const car2 = await Cars.add({
        user_id: 2,
        make: 'test2',
        model: 'test2',
        year: 2011,
        active: 1,
        created_at: date
      });

      const filteredSearchById = await Cars.findById(2);
      expect(filteredSearchById).toEqual({
        id: 2,
        user_id: 2,
        make: 'test2',
        model: 'test2',
        year: 2011,
        active: 1,
        created_at: date
      });
    });
  });

  describe('add', () => {
    it('adds a new car info to db', async () => {
      const newCar = await Cars.add({
        user_id: 1,
        make: 'test',
        model: 'test',
        year: 2011,
        active: 1,
        created_at: date
      });
      expect(newCar).toEqual({
        id: 1,
        user_id: 1,
        make: 'test',
        model: 'test',
        year: 2011,
        active: 1,
        created_at: date
      });
      const allCars = await Cars.findAll();
      expect(allCars).toHaveLength(1);
    });
  });

  describe('remove', () => {
    it('removes car info from db', async () => {
      const newCar = await Cars.add({
        user_id: 1,
        make: 'test',
        model: 'test',
        year: 2011,
        active: 1,
        created_at: date
      });
      const newCar2 = await Cars.add({
        user_id: 2,
        make: 'test2',
        model: 'test2',
        year: 2012,
        active: 1,
        created_at: date
      });
      const newCar3 = await Cars.add({
        user_id: 3,
        make: 'test3',
        model: 'test3',
        year: 2013,
        active: 1,
        created_at: date
      });
      const removeCar = await Cars.remove(3);
      expect(removeCar).toEqual(1);
    });
  });
  describe('getCarsCount', () => {
    it('returns total number of cars added', async () => {
      await Cars.add({
        user_id: 1,
        make: 'test',
        model: 'test',
        year: 2011,
        active: 1,
        created_at: date
      });

      const car2 = await Cars.add({
        user_id: 2,
        make: 'test2',
        model: 'test2',
        year: 2011,
        active: 1,
        created_at: date
      });

      const returnCount = await Cars.getCarsCount();
      expect(returnCount).toEqual({
        count: 2
      });
    });
  });
  describe('getCarsCount', () => {
    it('returns total number of active cars and inactive cars', async () => {
      await Cars.add({
        user_id: 1,
        make: 'test',
        model: 'test',
        year: 2011,
        active: 1,
        created_at: date
      });

      const car2 = await Cars.add({
        user_id: 2,
        make: 'test2',
        model: 'test2',
        year: 2012,
        active: 0,
        created_at: date
      });

      const car3 = await Cars.add({
        user_id: 1,
        make: 'test3',
        model: 'test3',
        year: 2019,
        active: 1,
        created_at: date
      });

      const returnActiveCount = await Cars.getActiveCount();
      expect(returnActiveCount).toEqual({
        count: 2
      });

      const returnInactiveCount = await Cars.getInactiveCount();
      expect(returnInactiveCount).toEqual({
        count: 1
      });
    });
  });
});
