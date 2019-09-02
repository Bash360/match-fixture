import mongoose from 'mongoose';
interface Ifixtures extends mongoose.Document {
  id: string;
  leagueName: string;
  homeTeamId: string;
  awayTeamId: string;
  homeTeamName: string;
  awayTeamName: string;
  goalsHomeTeam: number | null;
  goalsAwayTeam: number | null;
  stadium: string;
  goals: number | null;
  referee: string;
  status: string | null;
  matchDate: Date;
  archived: boolean;
}
export default Ifixtures;
