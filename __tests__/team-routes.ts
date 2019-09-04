import app from '../src/app';
import request from 'supertest';
import { connectToDB, disconnectFromDB } from '../test-setup/test-connection';
let token: string;
let teamId: string;
describe('test for team routes', () => {
  beforeAll(async () => {
    await connectToDB();
    const { body } = await request(app)
      .post('/api/v1/admin/signup')
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
      .post('/api/v1/team/add')
      .set({ authorization: `bearer ${token}` })
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
    expect(status).toBe(200);
    expect(body).toHaveProperty('stadiumName');
    teamId = body.id;
  });
  it('should return team', async () => {
    const { body, status } = await request(app)
      .get(`/api/v1/team/${teamId}`)
      .set({ authorization: `bearer ${token}` });
    expect(status).toBe(200);
    expect(body).toHaveProperty('name');
  });
  it('should return update team details ', async () => {
    const { body, status } = await request(app)
      .put(`/api/v1/team/update/${teamId}`)
      .set({ authorization: `bearer ${token}` })
      .send({ stadiumName: 'new london' });
    expect(status).toBe(200);
    expect(body.stadiumName).toMatch('new london');
  });
});
