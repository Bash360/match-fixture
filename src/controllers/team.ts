import Team from '../models/team';
import Iteam from '../typings/team';
import User from '../models/user';
async function createTeam(
  adminId: string,
  name: string,
  teamCode: string,
  logo: string,
  country: string,
  city: string,
  founded: string,
  headCoach: string,
  stadiumName: string,
  stadiumAddress: string,
  stadiumCapacity: Number,
): Promise<Iteam> {
  let isAdmin = await User.findOne({ id: adminId, isAdmin: true }).select({
    isAdmin: 1,
  });
  if (!isAdmin) throw new Error('only admin can create teams');
  const foundingDate: Date = new Date(founded);
  const team = new Team({
    name,
    teamCode,
    logo,
    country,
    city,
    founded: foundingDate,
    headCoach,
    stadiumName,
    stadiumAddress,
    stadiumCapacity,
  });
  await team.save();
  return team.teamDetails();
}
async function removeTeam(adminId: string, teamId: string): Promise<string> {
  const admin = await User.findOne({ id: adminId }).select({ isAdmin: 1 });
  if (!admin) throw new Error('only admin can remove teams');
  const team = await Team.findOneAndUpdate(
    { id: teamId },
    { $set: { archived: true } },
  );
  if (!team) throw new Error('invalid team ID');
  return 'team successfully deleted';
}
async function getTeam(teamId: string): Promise<Iteam> {
  const team = await Team.findOne({ id: teamId, archived: false });
  if (!team) throw new Error('invalid id for team');
  return team.teamDetails();
}
interface Iupdate {
  headCoach?: string;
  logo?: string;
  stadiumName?: string;
  stadiumAddress?: string;
  city?: string;
  stadiumCapacity?: number;
}

async function updateTeam(
  adminId: string,
  teamId: string,
  updateDetails: Iupdate,
): Promise<Iteam> {
  const admin = await User.findOne({ id: adminId }).select({ isAdmin: 1 });
  if (!admin) throw new Error('only admin can update teams');
  const team = await Team.findOne({ id: teamId, archived: false });
  if (!team) throw new Error('invalid team id');
  const {
    headCoach = team.headCoach,
    logo = team.logo,
    stadiumName = team.stadiumName,
    stadiumAddress = team.stadiumAddress,
    stadiumCapacity = team.stadiumCapacity,
  } = updateDetails;
  team.headCoach = headCoach;
  team.logo = logo;
  team.stadiumName = stadiumName;
  team.stadiumAddress = stadiumAddress;
  team.stadiumCapacity = stadiumCapacity;
  await team.save();
  return await team.teamDetails();
}
async function getTeamByName(teamName: string): Promise<Iteam> {
  const teamDetails = await Team.findOne({
    name: teamName,
    archived: false,
  }).select({
    __v: 0,
    _id: 0,
    archived: 0,
  });
  if (!teamDetails) throw new Error('invalid id for team');
  return teamDetails;
}
async function getAllTeams(): Promise<Array<Iteam> | null> {
  const teams = await Team.find({ archived: false }).select({
    __v: 0,
    _id: 0,
    archived: 0,
  });
  if (!teams) return null;
  return teams;
}
export {
  createTeam,
  removeTeam,
  getTeam,
  updateTeam,
  getTeamByName,
  getAllTeams,
};
