import mongoose from 'mongoose';

interface Iuser extends mongoose.Document {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  generateToken(): string;
}
export default Iuser;
