import Fixture from '../models/fixtures';
import Ifixture from '../typings/fixtures';
import User from '../models/user';
import Team from '../models/team';
import fixtures from '../models/fixtures';

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
  const homeTeamID: string = homeTeam._id;
  const awayTeamID: string = awayTeam._id;
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
  });
  return fixture.save();
}
async function getFixture(fixtureId: string): Promise<Ifixture | null> {
  const fixture = Fixture.findOne({ id: fixtureId, archived: false })
    .select({ _id: 0, __v: 0 })
    .populate({
      path: 'homeTeamID',
      match: { archived: false },
      select: '-__v -_id -archived',
    })
    .populate({
      path: 'awayTeamID',
      match: { archived: false },
      select: '-__v -_id -archived',
    });
  return fixture;
}
async function getAllFixtures(): Promise<Array<Ifixture> | null> {
  const allFixtures = Fixture.find({ archived: false })
    .select({ _id: 0, __v: 0 })
    .populate({
      path: 'homeTeamID',
      match: { archived: false },
      select: '-__v -_id -archived',
    })
    .populate({
      path: 'awayTeamID',
      match: { archived: false },
      select: '-__v -_id -archived',
    });
  if (!fixtures.length) return null;
  return allFixtures;
}
interface Iupdate {
  goalsHomeTeam?: number;
  goalsAwayTeam?: number;
}
async function updateFixture(
  adminId: string,
  fixtureId: string,
  updateDetails: Iupdate,
): Promise<Ifixture> {
  const admin = await User.findOne({ id: adminId }).select({ isAdmin: 1 });
  if (!admin) throw new Error('only admin can update fixtures');
  const fixture = await Fixture.findOne({
    id: fixtureId,
    archived: false,
  })
    .select({ __v: 0, archived: 0 })
    .populate({
      path: 'homeTeamID',
      match: { archived: false },
      select: '-__v -_id -archived',
    })
    .populate({
      path: 'awayTeamID',
      match: { archived: false },
      select: '-__v -_id -archived',
    });
  if (!fixture) throw new Error('invalid fixture ID');
  if (fixture.status === 'completed' || fixture.status === 'cancelled') {
    throw new Error(
      'can not update matches that are already completed or cancelled',
    );
  }
  const {
    goalsHomeTeam = fixture.goalsHomeTeam,
    goalsAwayTeam = fixture.goalsAwayTeam,
  } = updateDetails;
  const goalsByHomeTeam: number = goalsHomeTeam ? goalsHomeTeam : 0;
  const goalsByAwayTeam: number = goalsAwayTeam ? goalsAwayTeam : 0;
  const totalGoals: number = fixture.goals
    ? fixture.goals
    : goalsByHomeTeam + goalsByAwayTeam;
  fixture.goalsAwayTeam = goalsByAwayTeam;
  fixture.goalsHomeTeam = goalsByHomeTeam;
  fixture.goals = totalGoals;
  fixture.status = 'ongoing';
  return fixture.save();
}
async function endGame(adminId: string, fixtureId: string): Promise<Ifixture> {
  const admin = await User.findOne({ id: adminId }).select({ isAdmin: 1 });
  if (!admin) throw new Error('only admins are allowed to end games');
  const fixture = await Fixture.findOne({ id: fixtureId })
    .select({ __v: 0 })
    .populate({
      path: 'homeTeamID',
      match: { archived: false },
      select: '-__v -_id -archived',
    })
    .populate({
      path: 'awayTeamID',
      match: { archived: false },
      select: '-__v -_id -archived',
    });
  if (!fixture) throw new Error('invalid fixture Id');
  if (fixture.status === 'completed' || fixture.status === 'cancelled') {
    throw new Error('cannot end an already concluded match');
  }
  if (fixture.status === 'pending') fixture.status = 'cancelled';
  if (fixture.status === 'ongoing') fixture.status = 'completed';
  return fixture.save();
}
export { createFixture, getFixture, getAllFixtures, updateFixture, endGame };
