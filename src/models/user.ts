import { Schema, model } from 'mongoose';
import Iuser from '../typings/user';
const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { enum: ['male', 'female'], reqired: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true },
);
UserSchema.pre('save', async function() {
  if (this.isNew) {
    this.id = 'bash'; //uuid
  }
});
export default model<Iuser>('user', UserSchema);
