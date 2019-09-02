import { connectToDB, disconnectFromDB } from '../test-setup/test-connection';
import { createAdmin } from '../src/controllers/user';
import { createTeam } from '../src/controllers/team';
import { createFixture } from '../src/controllers/fixtures';
let adminId: string;
let homeTeam: string;
let awayTeam: string;
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
    expect(result).toHaveProperty('homeTeamID');
  });
});
