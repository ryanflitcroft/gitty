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

  it('should be able to fetch a list of quotes from programming-quotes-api, where the length of the list is dependent on the url params given', async () => {
    let res = await request(app).get('/api/v1/quotes/programming/1');

    expect(res.body).toEqual([
      {
        author: expect.any(String),
        description: expect.any(String),
      },
    ]);

    res = await request(app).get('/api/v1/quotes/programming/3');

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

  it('should be able to get a list of quotes from futuramaapi, where the length of the list is dependent on the url params given', async () => {
    let res = await request(app).get('/api/v1/quotes/futurama/1');
    expect(res.body).toEqual([
      {
        author: expect.any(String),
        description: expect.any(String),
      },
    ]);

    res = await request(app).get('/api/v1/quotes/futurama/3');
    expect(res.body).toEqual([
      {
        author: expect.any(String),
        description: expect.any(String),
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

  it.only('should be able to get a list of quotes from futuramaapi, where the length of the list is dependent on the url params given', async () => {
    const res = await request(app).get('/api/v1/quotes/quotable/1');
    expect(res.body).toEqual([
      {
        author: expect.any(String),
        description: expect.any(String),
      },
    ]);
  });
});
