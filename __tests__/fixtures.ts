import { connectToDB, disconnectFromDB } from '../test-setup/test-connection';
import { createAdmin } from '../src/controllers/user';
import { createTeam } from '../src/controllers/team';
import {
  createFixture,
  getFixture,
  getAllFixtures,
  updateFixture,
  endGame,
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
    const result = await createFixture(
      adminId,
      homeTeam,
      awayTeam,
      'mike dean',
      '12-9-2019',
    );
    fixtureId = result.id;
    expect(result).toHaveProperty('homeTeamID');
  });
  it('should return fixture ', async () => {
    const result = await getFixture(fixtureId);
    expect(result).toHaveProperty('leagueName');
  });
  it('should return all fixtures', async () => {
    const result = await getAllFixtures();
    expect(result).toHaveLength(1);
  });
  it('should update fixture and return new fixture details', async () => {
    const result = await updateFixture(adminId, fixtureId, {
      goalsAwayTeam: 0,
      goalsHomeTeam: 0,
    });
    expect(result.goalsAwayTeam).toBe(0);
    expect(result.goalsHomeTeam).toBe(0);
  });
  it('should end game and return fixture details', async () => {
    const result = await endGame(adminId, fixtureId);
    expect(result.status).toMatch('completed');
  });
});
