import { Schema, model } from 'mongoose';
import Ifixtures from '../typings/fixtures';
import uuid from 'uuid/v4';
const fixtureSchema = new Schema(
  {
    id: String,
    leagueName: { type: String, default: 'English premier league', trim: true },
    homeTeamID: {
      type: Schema.Types.ObjectId,
      ref: 'team',
      required: true,
      trim: true,
    },
    homeTeamName: { type: String, required: true, trim: true, lowercase: true },
    awayTeamName: { type: String, required: true, trim: true, lowercase: true },
    awayTeamID: {
      type: Schema.Types.ObjectId,
      ref: 'team',
      required: true,
      trim: true,
    },
    goalsHomeTeam: { type: Number, default: null },
    goalsAwayTeam: { type: Number, default: null },
    stadium: { type: String, required: true, trim: true, lowercase: true },
    goals: { type: Number, default: null },
    referee: { type: String, required: true, trim: true, lowercase: true },
    status: {
      type: String,
      enum: ['pending', 'ongoing', 'completed'],
      default: 'pending',
      trim: true,
      lowercase: true,
    },
    matchDate: { type: Date, required: true, minlength: Date.now() },
    archived: { type: Boolean, required: false },
    fixtureUrl: { type: String, required: true, lowercase: true },
  },
  { timestamps: true, id: false },
);

fixtureSchema.pre('save', async function() {
  if (this.isNew) {
    this.id = uuid();
  }
});

export default model<Ifixtures>('fixture', fixtureSchema);
