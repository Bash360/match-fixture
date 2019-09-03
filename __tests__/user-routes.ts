import app from '../src/app';
import request from 'supertest';
import { connectToDB, disconnectFromDB } from '../test-setup/test-connection';
describe('test for user route', () => {
  beforeAll(async () => {
    await connectToDB();
  });
  afterAll(async () => {
    await disconnectFromDB();
  });
  it('should return a status code of 200 and user details', async () => {
    const { body, status } = await request(app)
      .post('/api/v1/signupuser')
      .send({
        firstName: 'chidera',
        lastName: 'stephen',
        gender: 'female',
        email: 'stephenchidera@gmail.com',
        password: 'bashbash',
      });
    expect(status).toBe(200);
    expect(body).toHaveProperty('token');
  });
  it('should log in user and return user details', async () => {
    const { body, status, header } = await request(app)
      .post('/api/v1/login')
      .send({ email: 'stephenchidera@gmail.com', password: 'bashbash' });
    expect(status).toBe(200);
    expect(body).toHaveProperty('firstName');
    expect(header).toHaveProperty('x-auth-token');
  });
});
