const supertest = require('supertest');

const app = require('../app');

describe('POST /user/register', () => {
  it('[t] Should respond with 400', async () => {
    await supertest(app)
      .post('/user/register')
      .expect('Content-Type', /json/)
      .expect(400);
  });
});

describe('POST /user/login', () => {
  it('[t] Should respond with 400', async () => {
    await supertest(app)
      .post('/user/login')
      .expect('Content-Type', /json/)
      .expect(400);
  });
});
