import { createUser } from '../src/controllers/user';
import { connectToDB, disconnectFromDB } from '../test-setup/test-connection';

describe('test for user controller', () => {
  beforeAll(async () => {
    await connectToDB();
  });
  afterAll(async () => {
    await disconnectFromDB();
  });
  it('should create user and return user details', async () => {
    const result = await createUser(
      'mark',
      'bashir',
      'beejayphil@gmail.com',
      'male',
      'bashbash',
    );
    expect(result).toHaveProperty('email');
  });
});
