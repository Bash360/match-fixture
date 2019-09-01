import { Schema, model } from 'mongoose';
import Ifixtures from '../typings/fixtures';
import uuid from 'uuid/v4';
const fixtureSchema = new Schema(
  {
    id: String,
    leagueName: { type: String, required: true },
    homeTeamID: { type: Schema.Types.ObjectId, ref: 'team', required: true },
    awayTeamID: { type: Schema.Types.ObjectId, ref: 'team', required: true },
    goalsHomeTeam: { type: Number, default: null },
    goalsAwayTeam: { type: Number, default: null },
    stadium: { type: String, required: true },
    goals: { type: Number, default: null },
    referee: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'ongoing', 'completed'],
      default: 'pending',
    },
    matchDate: { type: Date, required: true, minlength: Date.now() },
    archived: { type: Boolean, required: true },
    fixtureUrl: { type: String, required: true },
  },
  { timestamps: true, id: false },
);

fixtureSchema.pre('save', async function() {
  if (this.isNew) {
    this.id = uuid();
  }
});

export default model<Ifixtures>('fixture', fixtureSchema);
