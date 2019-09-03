import app from '../src/app';
import request from 'supertest';
import { connectToDB, disconnectFromDB } from '../test-setup/test-connection';
describe('admin route test', () => {
  beforeAll(async () => {
    await connectToDB();
  });
  afterAll(async () => {
    await disconnectFromDB();
  });
  it('should sign up admin and return admin details', async () => {
    const { body, status } = await request(app)
      .post('/api/v1/signupadmin')
      .send({
        firstName: 'veronica',
        lastName: 'bashir',
        email: 'veronicabashir@gmail.com',
        gender: 'female',
        password: 'bashbash',
      });
    expect(status).toBe(200);
    expect(body.isAdmin).toBeTruthy();
  });
  it('should login admin and return admin details', async () => {
    const { body, status, header } = await request(app)
      .post('/api/v1/loginadmin')
      .send({ email: 'veronicabashir@gmail.com', password: 'bashbash' });
    expect(status).toBe(200);
    expect(body).toHaveProperty('lastName');
    expect(header).toHaveProperty('x-auth-admin');
  });
});
