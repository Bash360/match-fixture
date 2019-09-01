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
    stadiumName,
    stadiumAddress,
    stadiumCapacity,
  });
  await team.save();
  return team.teamDetails();
}
export { createTeam };
