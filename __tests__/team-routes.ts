import app from '../src/app';
import request from 'supertest';
import { connectToDB, disconnectFromDB } from '../test-setup/test-connection';
let token: string;
describe('test for team routes', () => {
  beforeAll(async () => {
    await connectToDB();
    const { body } = await request(app)
      .post('/api/v1/signupadmin')
      .send({
        firstName: 'veronica',
        lastName: 'bashir',
        email: 'beauty@gmail.com',
        gender: 'female',
        password: 'bashbash',
      });
    token = body.token;
  });
  afterAll(async () => {
    await disconnectFromDB();
  });
  it('should create a team and return team details', async () => {
    const { body, status } = await request(app)
      .post('/api/v1/addteam')
      .set({ header: {} })
      .send({
        name: 'everton',
        teamCode: 'erv',
        logo: 'everton.jpg',
        country: 'england',
        city: 'north london',
        founded: '10-07-1886',
        headCoach: 'Unai Emery',
        stadiumName: 'Stadium',
        stadiumAddress: 'Holloway, London',
        stadiumCapacity: 200000,
      });
    console.log(body, status);
  });
});
