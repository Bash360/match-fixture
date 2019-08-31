import User from '../models/user';
import bcrypt from 'bcrypt';

/**
 * @description function to create user
 * @author "mark bashir"
 * @date 2019-08-31
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} email
 * @param {string} gender
 * @param {string} password
 * @param {string} [isAdmin]
 * @returns an object of user details
 */
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
async function loginUser(mail: string, passwrd: string) {
  const user = await User.findOne({ email: mail, archived: false });
  if (!user) throw new Error('email does not belong to a registered user');
  const {
    firstName,
    lastName,
    gender,
    password,
    id,
    isAdmin,
    email,
    createdAt,
    updatedAt,
  } = user;
  let match: boolean = await bcrypt.compare(passwrd, password);
  if (!match) throw new Error('wrong password');
  return {
    firstName,
    lastName,
    gender,
    id,
    email,
    isAdmin,
    createdAt,
    updatedAt,
  };
}
export { createUser, loginUser };
