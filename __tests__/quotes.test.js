const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('routes for quotes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it.only('should be able to fetch a list of 3 quotes from programming-quotes-api', async () => {
    const res = await request(app).get('/api/v1/quotes/programming/3');

    expect(res.body).toEqual([
      {
        author: expect.any(String),
        //maxLength: 50
        description: expect.any(String),
        // minLength: 10
        //maxLength: 500
      },
      {
        author: expect.any(String),
        description: expect.any(String),
      },
      {
        author: expect.any(String),
        description: expect.any(String),
      },
    ]);
  });
});
