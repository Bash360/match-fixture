import { Schema, model } from 'mongoose';
import Iuser from '../typings/user';
import uuid from 'uuid/v4';
import jwt from 'jsonwebtoken';
require('dotenv/config');
import uniqueValidate from 'mongoose-unique-validator';
let secret: string;
let UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female'], required: true },
    isAdmin: { type: Boolean, default: false },
    archived: { type: Boolean, default: false },
  },
  { timestamps: true },
);
UserSchema.pre('save', async function() {
  if (this.isNew) {
    this.id = uuid();
  }
});
if (process.env.SECRET) {
  secret = process.env.SECRET;
} else {
  process.exit(1);
}
UserSchema.methods.generateToken = function(): string {
  const token: string = jwt.sign({ email: this.email, id: this.id }, secret);
  return token;
};
UserSchema.plugin(uniqueValidate, {
  message: 'Error, {VALUE} is already a registered account',
});
export default model<Iuser>('user', UserSchema);
