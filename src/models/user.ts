import { Schema, model } from 'mongoose';
import Iuser from '../typings/user';
import uuid from 'uuid/v4';
const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female'], required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true },
);
UserSchema.pre('save', async function() {
  if (this.isNew) {
    this.id = uuid();
  }
});
export default model<Iuser>('user', UserSchema);
