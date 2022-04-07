const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/utils/github');

describe('gitty routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should redirect to GitHub OAuth page on signup/signin', async () => {
    const res = await request(app).get('/api/v1/github/login');

    expect(res.header.location).toMatch(
      /https:\/\/github.com\/login\/oauth\/authorize\?client_id=[\w\d]+&scope=user&redirect_uri=http:\/\/localhost:7890\/api\/v1\/github\/login\/callback/i
    );
  });

  it('it should be able to sign in and redirect users back to dashboard', async () => {
    const res = await request
      .agent(app)
      .get('/api/v1/github/login/callback?code=42')
      .redirects(1);
    expect(res.req.path).toEqual('/api/v1/posts');
  });

  it('should be able to delete a users cookie', async () => {
    const agent = request.agent(app);
    await agent.get('/api/v1/github/login/callback?code=42').redirects(1);
    const res = await agent.delete('/api/v1/github');

    expect(res.body).toEqual({
      message: 'Signed out successfully!',
      success: true,
    });
  });

  it('should allow authenticated users to insert an instance of Post to posts', async () => {
    const agent = request.agent(app);
    await agent.get('/api/v1/github/login/callback?code=42').redirects(1);

    const res = await agent.post('/api/v1/posts').send({
      title: 'Big news!!',
      description: '...cant tell you what though!!',
    });

    expect(res.body).toEqual({
      id: expect.any(String),
      title: 'Big news!!',
      description: '...cant tell you what though!!',
      createdAt: expect.any(String),
    });
  });

  it('should not allow unauthenticated users to insert an instance of Post to posts', async () => {
    const res = await request(app).post('/api/v1/posts').send({
      title: 'Big news!!',
      description: '...cant tell you what though!!',
    });

    expect(res.body).toEqual({
      message: 'You must be signed in!',
      status: 401,
    });
  });

  it('should allow authenticated users to get a list of each instance of Post from posts', async () => {
    const agent = request.agent(app);

    let res = await agent.get('/api/v1/posts');

    expect(res.body).toEqual({
      message: 'You must be signed in!',
      status: 401,
    });

    await agent.get('/api/v1/github/login/callback?code=42').redirects(1);
    for (let i = 0; i < 3; i++) {
      await agent.post('/api/v1/posts').send({
        title: 'Big news!!',
        description: '...cant tell you what though!!',
      });
    }

    res = await agent.get('/api/v1/posts');

    expect(res.body).toEqual([
      {
        id: expect.any(String),
        createdAt: expect.any(String),
        title: 'Big news!!',
        description: '...cant tell you what though!!',
      },
      {
        id: expect.any(String),
        createdAt: expect.any(String),
        title: 'Big news!!',
        description: '...cant tell you what though!!',
      },
      {
        id: expect.any(String),
        createdAt: expect.any(String),
        title: 'Big news!!',
        description: '...cant tell you what though!!',
      },
    ]);
  });
});
