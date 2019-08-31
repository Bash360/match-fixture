import { createUser, loginUser } from '../src/controllers/user';
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
    expect(result).toMatchObject({
      isAdmin: expect.any(Boolean),
      id: expect.any(String),
      firstName: expect.any(String),
      lastName: expect.any(String),
      email: expect.any(String),
      gender: expect.any(String),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      token: expect.any(String),
    });
  });
  it('should return user details', async () => {
    const result = await loginUser('beejayphil@gmail.com', 'bashbash');
    expect(result).toMatchObject({
      isAdmin: expect.any(Boolean),
      id: expect.any(String),
      firstName: expect.any(String),
      lastName: expect.any(String),
      email: expect.any(String),
      gender: expect.any(String),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      token: expect.any(String),
    });
  });
  it('should throw', async () => {
    await loginUser('bayphil@gmail.com', 'bashbash')
      .then(data => {
        console.log(data);
      })
      .catch(data => {
        expect(data.message).toMatch(
          'email does not belong to a registered user',
        );
      });
  });
});
