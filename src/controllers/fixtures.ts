import Fixture from '../models/fixtures';
import Ifixture from '../typings/fixtures';
import User from '../models/user';
import Team from '../models/team';

async function createFixture(
  adminId: string,
  homeTeamName: string,
  awayTeamName: string,
  stadium: string,
  referee: string,
  matchDate: string,
): Promise<Ifixture> {
  const admin = User.findOne({ id: adminId, isAdmin: true }).select({
    isAdmin: 1,
  });
  if (!admin) throw new Error('only admin can create fixtures');
  const homeTeam = User.findOne({ name: homeTeamName });
  if (!homeTeam) throw new Error('invalid home team name');
}
