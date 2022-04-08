const pool = require('../lib/utils/pool');
const setup = require('supertest');
const request = require('supertest');
const app = require('../lib/app');

describe('routes for quotes', () => {
  beforeEach(() => {
    setup.pool();
  });

  afterAll(() => {
    pool.end();
  });

  it('should be able to fetch a list of 3 quotes from programming-quotes-api', async () => {
    const res = request(app).get('/api/v1/quotes/programming');
    expect(res.body).toEqual([
      {
        id: expect.any(String),
        author: expect.any(String),
        //maxLength: 50
        description: expect.any(String),
        // minLength: 10
        //maxLength: 500
      },
      {
        id: expect.any(String),
        author: expect.any(String),
        description: expect.any(String),
      },
      {
        id: expect.any(String),
        author: expect.any(String),
        description: expect.any(String),
      },
    ]);
  });
});
