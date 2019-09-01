import { createTeam } from '../src/controllers/team';
import { connectToDB, disconnectFromDB } from '../test-setup/test-connection';
import { createAdmin } from '../src/controllers/user';
let adminId: string;
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
      '	Unai Emery',
      '	Emirates Stadium',
      '8 england road blah blah blah',
      200000,
    );
    expect(teamDetails).toHaveProperty('name');
  });
});
