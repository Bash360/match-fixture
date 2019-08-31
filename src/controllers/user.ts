import User from '../models/user';
import bcrypt from 'bcrypt';

async function createUser(
  firstName: string,
  lastName: string,
  email: string,
  gender: string,
  password: string,
  isAdmin?: string,
) {
  const hash: string = await bcrypt.hash(password, 10);
  const user = new User({
    firstName,
    lastName,
    email,
    gender,
    password: hash,
    isAdmin,
  });
  const result = await user.save();
  return {
    isAdmin: result.isAdmin,
    firstName: result.firstName,
    lastName: result.lastName,
    id: result.id,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
    email: result.email,
    gender: result.gender,
  };
}
export { createUser };
