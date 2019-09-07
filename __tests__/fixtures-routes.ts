import app from '../src/app';
import request from 'supertest';
import { connectToDB, disconnectFromDB } from '../test-setup/test-connection';
let token: string;
let homeTeamName: string;
let awayTeamName: string;
let fixtureId: string;

describe('test for fixture route', () => {
  beforeAll(async () => {
    await connectToDB();
    const adminDetails = await request(app)
      .post('/api/v1/admin/signup')
      .send({
        firstName: 'veronica',
        lastName: 'bashir',
        email: 'v@gmail.com',
        gender: 'female',
        password: 'bashbash',
      });
    token = adminDetails.body.data.token;
    const homeTeamDetails = await request(app)
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
    const awayTeamDetails = await request(app)
      .post('/api/v1/team/add')
      .set({ authorization: `bearer ${token}` })
      .send({
        name: 'barcelona',
        teamCode: 'erv',
        logo: 'barcelona.jpg',
        country: 'spain',
        city: 'spain',
        founded: '10-07-1886',
        headCoach: 'Unai Emery',
        stadiumName: 'Stadium',
        stadiumAddress: 'Holloway, spain',
        stadiumCapacity: 500000,
      });
    homeTeamName = homeTeamDetails.body.data.name;
    awayTeamName = awayTeamDetails.body.data.name;
  });
  afterAll(async () => {
    await disconnectFromDB();
  });
  it('should return fixture details', async () => {
    const { body, status } = await request(app)
      .post('/api/v1/fixture/add')
      .set({ authorization: `bearer ${token}` })
      .send({
        homeTeamName: homeTeamName,
        awayTeamName: awayTeamName,
        referee: 'mark bashir',
        matchDate: '12-9-2020',
      });

    expect(status).toBe(200);
    expect(body.data).toHaveProperty('fixtureURL');
    fixtureId = body.data.id;
  });
  it('should return all fixtures', async () => {
    const { body, status } = await request(app)
      .get('/api/v1/fixture/all')
      .set({ authorization: `bearer ${token}` });
    expect(status).toBe(200);
    expect(body.data).toHaveLength(1);
  });
  it('should return updated fixture', async () => {
    const { body, status } = await request(app)
      .put(`/api/v1/fixture/update/${fixtureId}`)
      .set({ authorization: `bearer ${token}` })
      .send({ goalsHomeTeam: 2 });
    expect(status).toBe(200);
    expect(body.data.goalsHomeTeam).toBe(2);
  });
  it('should end game and return fixture details', async () => {
    const { body, status } = await request(app)
      .put(`/api/v1/fixture/endgame/${fixtureId}`)
      .set({ authorization: `bearer ${token}` });
    expect(status).toBe(200);
    expect(body.data.status).toMatch('completed');
  });
  it('should should return fixture details', async () => {
    const { body, status } = await request(app).get(
      `/api/v1/fixture?name=${awayTeamName}`,
    );
    expect(status).toBe(200);
    expect(body.data).toHaveProperty('fixtureURL');
  });

  it('should return fixture successfully removed', async () => {
    const { body, status } = await request(app)
      .delete(`/api/v1/fixture/remove/${fixtureId}`)
      .set({ authorization: `bearer ${token}` });
    expect(status).toBe(200);
    expect(body.data).toMatch('fixture successfully deleted');
  });
});
