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
  founded: Date,
  headCoach: string,
  stadiumName: string,
  stadiumAddress: string,
  stadiumCapacity: Number,
): Promise<Iteam> {
  let isAdmin = await User.findOne({ id: adminId, isAdmin: true }).select({
    isAdmin: 1,
  });
  if (!isAdmin) throw new Error('only admin can create teams');
  const team = new Team({
    name,
    teamCode,
    logo,
    country,
    city,
    founded,
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
  team.save();
  return team.teamDetails();
}
export { createTeam, removeTeam, getTeam, updateTeam };
