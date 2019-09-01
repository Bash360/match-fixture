import {
  createTeam,
  removeTeam,
  getTeam,
  updateTeam,
} from '../src/controllers/team';
import { connectToDB, disconnectFromDB } from '../test-setup/test-connection';
import { createAdmin } from '../src/controllers/user';
let adminId: string;
let teamId: string;
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
  });
  afterAll(async () => {
    await disconnectFromDB();
  });
  it('should return team details', async () => {
    const teamDetails = await createTeam(
      adminId,
      'arsenal football club',
      'ARS',
      'arsenal.jpg',
      'england',
      'north london',
      new Date('1886-10-07'),
      'Unai Emery',
      'Emirates Stadium',
      '8 england road blah blah blah',
      200000,
    );
    teamId = teamDetails.id;
    expect(teamDetails).toHaveProperty('name');
  });
  it('should return team details', async () => {
    const team = await getTeam(teamId);
    expect(team).toMatchObject({
      id: expect.any(String),
      name: expect.any(String),
      headCoach: expect.any(String),
      teamCode: expect.any(String),
      logo: expect.any(String),
      country: expect.any(String),
      founded: expect.any(String),
      stadiumName: expect.any(String),
      stadiumAddress: expect.any(String),
      city: expect.any(String),
      stadiumCapacity: expect.any(Number),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });
  it('should should return updated team', async () => {
    const result = await updateTeam(adminId, teamId, {
      headCoach: 'mark bashir',
    });
    expect(result.headCoach).toMatch('mark bashir');
  });

  it('should remove team and return team successfully removed ', async () => {
    const result = await removeTeam(adminId, teamId);

    expect(result).toMatch('team successfully deleted');
  });
});
