import User from '../models/user';

async function createUser(
  firstName: string,
  lastName: string,
  email: string,
  gender: string,
  password: string,
  isAdmin?: string,
) {
  const user = new User({
    firstName,
    lastName,
    email,
    gender,
    password,
    isAdmin,
  });
  return await user.save();
}
export { createUser };
