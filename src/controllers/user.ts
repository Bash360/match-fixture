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
) {
  const hash: string = await bcrypt.hash(password, 10);
  const user = new User({
    firstName,
    lastName,
    email,
    gender,
    password: hash,
  });
  const result = await user.save();
  const token: string = user.generateToken();
  return {
    isAdmin: result.isAdmin,
    firstName: result.firstName,
    lastName: result.lastName,
    id: result.id,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
    email: result.email,
    gender: result.gender,
    token,
  };
}
async function createAdmin(
  firstName: string,
  lastName: string,
  email: string,
  gender: string,
  password: string,
) {
  const hash: string = await bcrypt.hash(password, 10);
  const user = new User({
    firstName,
    lastName,
    email,
    gender,
    isAdmin: true,
    password: hash,
  });
  const result = await user.save();
  const token: string = user.generateToken();
  return {
    isAdmin: result.isAdmin,
    firstName: result.firstName,
    lastName: result.lastName,
    id: result.id,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
    email: result.email,
    gender: result.gender,
    token,
  };
}
async function loginUser(mail: string, passwrd: string): Promise<any> {
  const user = await User.findOne({ email: mail });
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
    token: user.generateToken(),
  };
}
async function getUser(id: string) {
  const user = await User.findOne({ id }).select({
    __v: 0,
    _id: 0,
    password: 0,
  });
  if (!user) return null;
  return user;
}
export { createUser, loginUser, getUser, createAdmin };
