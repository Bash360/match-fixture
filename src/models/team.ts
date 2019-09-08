import { Schema, model } from 'mongoose';
import Iteam from '../typings/team';
import uuid from 'uuid/v4';
import uniqueValidate from 'mongoose-unique-validator';
import toLower from './to-lower';
const teamSchema = new Schema(
  {
    id: String,
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
      set: toLower,
    },
    teamCode: { type: String, required: true, trim: true, set: toLower },
    logo: { type: String, required: true, trim: true, set: toLower },
    country: { type: String, required: true, trim: true, set: toLower },
    headCoach: { type: String, required: true, trim: true, set: toLower },
    city: { type: String, required: true, trim: true, set: toLower },
    founded: { type: Date, required: true },
    stadiumName: { type: String, required: true, trim: true, set: toLower },
    stadiumAddress: {
      type: String,
      required: true,
      trim: true,
      set: toLower,
    },
    stadiumCapacity: { type: Number, required: true },
    archived: { type: Boolean, default: false },
  },
  { timestamps: true, id: false },
);
teamSchema.pre('save', async function() {
  if (this.isNew) {
    this.id = uuid();
  }
});
teamSchema.methods.teamDetails = function() {
  const teamDetails = {
    id: this.id,
    name: this.name,
    headCoach: this.headCoach,
    teamCode: this.teamCode,
    logo: this.logo,
    country: this.country,
    founded: this.founded,
    stadiumName: this.stadiumName,
    stadiumAddress: this.stadiumAddress,
    city: this.city,
    stadiumCapacity: this.stadiumCapacity,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
  return teamDetails;
};
teamSchema.plugin(uniqueValidate, {
  message: 'Error can not have two teams with the same name {VALUE}',
  type: '',
});
export default model<Iteam>('team', teamSchema);
