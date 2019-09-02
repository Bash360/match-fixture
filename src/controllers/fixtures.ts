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
  fixtureURL?: string,
): Promise<Ifixture> {
  const admin = await User.findOne({ id: adminId, isAdmin: true }).select({
    isAdmin: 1,
  });
  if (!admin) throw new Error('only admin can create fixtures');
  const homeTeam = await Team.findOne({ name: homeTeamName });
  if (!homeTeam) throw new Error('invalid home team name');
  const awayTeam = await Team.findOne({ name: awayTeamName });
  if (!awayTeam) throw new Error('invalid away team name');
  const _matchDate: Date = new Date(matchDate);
  const homeTeamId: string = homeTeam.id;
  const awayTeamId: string = awayTeam.id;
  const fixture = new Fixture({
    homeTeamName,
    awayTeamName,
    stadium,
    referee,
    matchDate: _matchDate,
    homeTeamId,
    awayTeamId,
    fixtureURL,
  });
  return await fixture.save();
}
export { createFixture };
