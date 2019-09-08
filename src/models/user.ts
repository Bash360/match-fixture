import { Schema, model } from 'mongoose';
import Iuser from '../typings/user';
import uuid from 'uuid/v4';
import jwt from 'jsonwebtoken';
require('dotenv/config');
import uniqueValidate from 'mongoose-unique-validator';
let secret: string = `${process.env.SECRET}`;
import toLower from './to-lower';
let UserSchema = new Schema(
  {
    id: String,
    firstName: { type: String, required: true, trim: true, set: toLower },
    lastName: { type: String, required: true, trim: true, set: toLower },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true, trim: true },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: true,
      trim: true,
      lowercase: true,
    },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true, id: false },
);
UserSchema.pre('save', async function() {
  if (this.isNew) {
    this.id = uuid();
  }
});
UserSchema.methods.generateToken = function(): string {
  const token: string = jwt.sign(
    { isAdmin: this.isAdmin, id: this.id },
    secret,
    { expiresIn: 1800 }, //expires after 30 minutes
  );
  return token;
};
UserSchema.plugin(uniqueValidate, {
  message: 'Error, {VALUE} is already a registered account',
});
export default model<Iuser>('user', UserSchema);
