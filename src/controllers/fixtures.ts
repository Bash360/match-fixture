import Fixture from '../models/fixtures';
import Ifixture from '../typings/fixtures';
import User from '../models/user';
import Team from '../models/team';

async function createFixture(
  adminId: string,
  homeTeamName: string,
  awayTeamName: string,
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
  const homeTeamID: string = homeTeam.id;
  const awayTeamID: string = awayTeam.id;
  const stadium: string = homeTeam.stadiumName;
  const fixture = new Fixture({
    homeTeamName,
    awayTeamName,
    stadium,
    referee,
    matchDate: _matchDate,
    homeTeamID,
    awayTeamID,
    fixtureURL,
  })
    .populate('awayTeamID')
    .populate('homeTeamID');
  return fixture.save();
}
export { createFixture };
