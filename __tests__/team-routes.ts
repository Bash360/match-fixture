import app from '../src/app';
import request from 'supertest';
import { connectToDB, disconnectFromDB } from '../test-setup/test-connection';
let token: string;
let teamId: string;
let teamName: string;
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
    token = body.data.token;
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
    expect(body.data).toHaveProperty('stadiumName');
    teamId = body.data.id;
    teamName = body.data.name;
  });
  it('should return team', async () => {
    const { body, status } = await request(app)
      .get(`/api/v1/team/${teamId}`)
      .set({ authorization: `bearer ${token}` });
    expect(status).toBe(200);
    expect(body.data).toHaveProperty('name');
  });
  it('should return update team details ', async () => {
    const { body, status } = await request(app)
      .put(`/api/v1/team/update/${teamId}`)
      .set({ authorization: `bearer ${token}` })
      .send({ stadiumName: 'new london' });
    expect(status).toBe(200);
    expect(body.data.stadiumName).toMatch('new london');
  });
  it('search for team return team details ', async () => {
    const { body, status } = await request(app).get(
      `/api/v1/team/search?name=${teamName}`,
    );
    expect(status).toBe(200);
    expect(body.data[0]).toHaveProperty('headCoach');
  });
  it('should return teams', async () => {
    const { body, status } = await request(app)
      .get('/api/v1/team/all')
      .set({ authorization: `bearer ${token}` });
    expect(status).toBe(200);
    expect(body.data).toHaveLength(1);
  });

  it('should remove a team successfully and return team successfully deleted ', async () => {
    const { body, status } = await request(app)
      .delete(`/api/v1/team/delete/${teamId}`)
      .set({ authorization: `bearer ${token}` });
    expect(status).toBe(200);
    expect(body).toMatchObject({ data: 'team successfully deleted' });
  });
});
