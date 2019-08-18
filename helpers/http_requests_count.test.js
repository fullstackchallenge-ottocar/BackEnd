const db = require('../data/dbConfig.js');
const Http_requests = require('./http_requests_count_model');

const date = new Date().getTime();

describe('http_requests-model', () => {
  afterEach(async () => {
    await db('http_requests_count').truncate();
  });

  describe('findAll', () => {
    it('returns list of all HTTP requests sent to the server', async () => {
      await Http_requests.add({
        GET: 1
      });

      await Http_requests.add({
        POST: 1
      });

      const allRequests = await Http_requests.findAll();
      expect(allRequests).toHaveLength(2);
    });
  });

  describe('findBy', () => {
    it('returns HTTP method matched by filter', async () => {
      await Http_requests.add({
        GET: 1,
        created_at: date
      });

      const data2 = await Http_requests.add({
        POST: 1,
        created_at: date
      });

      const filteredSearch = await Http_requests.findBy({ POST: 1 }).first();
      expect(filteredSearch).toEqual({
        id: 2,
        GET: null,
        POST: 1,
        PUT: null,
        DELETE: null,
        created_at: date
      });
    });
  });

  describe('findById', () => {
    it('returns record by id', async () => {
      await Http_requests.add({
        GET: 1,
        created_at: date
      });

      const data2 = await Http_requests.add({
        POST: 1,
        created_at: date
      });

      const filteredSearch = await Http_requests.findById(2);
      expect(filteredSearch).toEqual({
        id: 2,
        GET: null,
        POST: 1,
        PUT: null,
        DELETE: null,
        created_at: date
      });
    });
  });

  describe('add', () => {
    it('adds record to db', async () => {
      const newData = await Http_requests.add({
        GET: 1,
        created_at: date
      });
      expect(newData).toEqual({
        id: 1,
        GET: 1,
        POST: null,
        PUT: null,
        DELETE: null,
        created_at: date
      });
      const allData = await Http_requests.findAll();
      expect(allData).toHaveLength(1);
    });
  });

  describe('getHTTPRequestsCount', () => {
    it('returns list of all HTTP requests sent to the server', async () => {
      await Http_requests.add({
        GET: 1
      });

      await Http_requests.add({
        POST: 1
      });

      await Http_requests.add({
        POST: 1
      });

      await Http_requests.add({
        PUT: 1
      });

      await Http_requests.add({
        DELETE: 1
      });

      const returnGETCount = await Http_requests.getGETCount();
      expect(returnGETCount).toEqual({
        get_count: 1
      });

      const returnPOSTCount = await Http_requests.getPOSTCount();
      expect(returnPOSTCount).toEqual({
        post_count: 2
      });

      const returnPUTCount = await Http_requests.getPUTCount();
      expect(returnPUTCount).toEqual({
        put_count: 1
      });

      const returnDELETECount = await Http_requests.getDELETECount();
      expect(returnDELETECount).toEqual({
        delete_count: 1
      });
    });
  });
});
