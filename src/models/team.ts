import { Schema, model } from 'mongoose';
import Iteam from '../typings/team';
import uuid from 'uuid/v4';
import uniqueValidate from 'mongoose-unique-validator';
const teamSchema = new Schema(
  {
    id: String,
    name: { type: String, required: true, unique: true },
    teamCode: { type: String, required: true },
    logo: { type: String, required: true },
    country: { type: String, required: true },
    headCoach: { type: String, required: true },
    city: { type: String, required: true },
    founded: { type: String, required: true },
    stadiumName: { type: String, required: true },
    stadiumAddress: { type: String, required: true },
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
  const teamDetail = {
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
  return teamDetail;
};
teamSchema.plugin(uniqueValidate, {
  message: 'Error can not have two teams with the same name {VALUE}',
  type: '',
});
export default model<Iteam>('team', teamSchema);
