const supertest = require('supertest');

const app = require('../app');

describe('GET /', () => {
  it('[t] Should respond with a message', async () => {
    const response = await supertest(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.message)
      .toEqual('Auth me API 🔑');
  });
});
