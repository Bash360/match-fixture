import { connectToDB, disconnectFromDB } from '../test-setup/test-connection';
import { createAdmin } from '../src/controllers/user';
import { createTeam } from '../src/controllers/team';
import {
  createFixture,
  getFixture,
  getAllFixtures,
  updateFixture,
  endGame,
  removeFixture,
  getFixtureByTeamName,
} from '../src/controllers/fixtures';
let adminId: string;
let homeTeam: string;
let awayTeam: string;
let fixtureId: string;
describe('test for team controller', () => {
  beforeAll(async () => {
    await connectToDB();
    const adminDetails = await createAdmin(
      'russell',
      'eweke',
      'rus@gmail.com',
      'male',
      'iamrussell',
    );
    adminId = adminDetails.id;
    const homeTeamDetails = await createTeam(
      adminId,
      'Manchester United football club',
      'MANU',
      'manu.jpg',
      'england',
      'Old Trafford',
      '10-07-1878',
      'Ole Gunnar Solskjær',
      'Old Trafford',
      ' Metropolitan Borough of Trafford, Greater Manchester, England',
      74879,
    );
    const awayTeamDetails = await createTeam(
      adminId,
      'Manchester City football club',
      'Man City',
      'mancity.jpg',
      'england',
      'Manchester',
      '10-07-1894',
      '	Pep Guardiola',
      'City of Manchester Stadium',
      'Manchester, England',
      55017,
    );
    homeTeam = homeTeamDetails.name;
    awayTeam = awayTeamDetails.name;
  });
  afterAll(async () => {
    await disconnectFromDB();
  });
  it('should should create fixture return fixtures details', async () => {
    const fixture = await createFixture(
      adminId,
      homeTeam,
      awayTeam,
      'mike dean',
      '12-9-20120',
      'fixture/gdhsdhsdhshdhs',
    );
    fixtureId = fixture.id;
    expect(fixture).toHaveProperty('homeTeamID');
  });
  it('should return fixture ', async () => {
    const fixture = await getFixture(fixtureId);
    expect(fixture).toHaveProperty('leagueName');
  });
  it('should return all fixtures', async () => {
    const fixture = await getAllFixtures();
    expect(fixture).toHaveLength(1);
  });
  it('should update fixture and return new fixture details', async () => {
    const fixture = await updateFixture(adminId, fixtureId, {
      goalsAwayTeam: 0,
      goalsHomeTeam: 0,
    });
    expect(fixture.goalsAwayTeam).toBe(0);
    expect(fixture.goalsHomeTeam).toBe(0);
  });
  it('should end game and return fixture details', async () => {
    const fixture = await endGame(adminId, fixtureId);
    expect(fixture.status).toMatch('completed');
  });
  it('should return fixture details', async () => {
    const fixture = await getFixtureByTeamName(awayTeam);
    expect(fixture).toHaveLength(1);
  });

  it('should remove fixture and return fixture successsfully removed', async () => {
    const fixture = await removeFixture(adminId, fixtureId);
    expect(fixture).toMatch('fixture successfully deleted');
  });
});
