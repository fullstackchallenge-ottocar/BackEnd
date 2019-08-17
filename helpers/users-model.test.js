const db = require('../data/dbConfig.js');
const Users = require('./users-model');
const hashPassword = require('./hashPassword');

const hashedPassword = hashPassword('123');
const date = new Date().getTime();

describe('users-model', () => {
  afterEach(async () => {
    await db('users').truncate();
  });

  describe('findAll', () => {
    it('returns list of all users in db', async () => {
      await Users.add({
        username: 'Mr test1',
        password: hashedPassword,
        email: 'test@hotmail.com'
      });

      await Users.add({
        username: 'Mr test2',
        password: hashedPassword,
        email: 'test2@hotmail.com'
      });

      const allUsers = await Users.findAll();
      expect(allUsers).toHaveLength(2);
    });
  });

  describe('findBy', () => {
    it('returns users matching filter', async () => {
      await Users.add({
        username: 'Mr test1',
        password: hashedPassword,
        email: 'test1@hotmail.com'
      });

      const user2 = await Users.add({
        username: 'Mr test2',
        password: hashedPassword,
        email: 'test2@hotmail.com',
        created_at: date
      });

      const filteredUser = await Users.findBy({ username: 'Mr test2' }).first();
      expect(filteredUser).toEqual({
        id: 2,
        username: 'Mr test2',
        password: hashedPassword,
        email: 'test2@hotmail.com',
        created_at: date
      });
    });
  });

  describe('findById', () => {
    it('returns user by userId', async () => {
      await Users.add({
        username: 'Mr test1',
        password: hashedPassword,
        email: 'test1@hotmail.com',
        created_at: date
      });

      const user3 = await Users.add({
        username: 'Mr test2',
        password: hashedPassword,
        email: 'test2@hotmail.com',
        created_at: date
      });

      const filteredUser = await Users.findById(2);
      expect(filteredUser).toEqual({
        id: 2,
        username: 'Mr test2',
        password: hashedPassword,
        email: 'test2@hotmail.com',
        created_at: date
      });
    });
  });

  describe('add', () => {
    it('adds user to db', async () => {
      const newUser = await Users.add({
        username: 'Mr test1',
        password: hashedPassword,
        email: 'test1@hotmail.com',
        created_at: date
      });
      expect(newUser).toEqual({
        id: 1,
        username: 'Mr test1',
        password: hashedPassword,
        email: 'test1@hotmail.com',
        created_at: date
      });
      const allUsers = await Users.findAll();
      expect(allUsers).toHaveLength(1);
    });
  });

  describe('remove', () => {
    it('removes users from db', async () => {
      const newUser = await Users.add({
        username: 'Mr test1',
        password: hashedPassword,
        email: 'test1@hotmail.com',
        created_at: date
      });
      const newUser2 = await Users.add({
        username: 'Mr test2',
        password: hashedPassword,
        email: 'test2@hotmail.com',
        created_at: date
      });
      const newUser3 = await Users.add({
        username: 'Mr test3',
        password: hashedPassword,
        email: 'test3@hotmail.com',
        created_at: date
      });
      const removeUser = await Users.remove(3);
      expect(removeUser).toEqual(1);
    });
  });
});
