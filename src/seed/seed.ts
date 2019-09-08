import Team from '../models/team';
import Fixture from '../models/fixtures';
import teams from './teams';
import admins from './admin';
import users from './users/';
import User from '../models/user';
import { connectToDB, disconnectFromDB } from './seed-setup/seed-connection';
export default async function seed() {
  await connectToDB();
  await seedUser();
  await seedAdmin();
  const teams = await seedTeam();
  await seedFixture(teams);
  await disconnectFromDB();
}
async function seedUser() {
  for (let user of users) {
    const userDoc = new User(user);
    await userDoc.save();
  }
}
async function seedAdmin() {
  for (let admin of admins) {
    const adminDoc = new User(admin);
    await adminDoc.save();
  }
}
async function seedTeam() {
  let savedTeams = [];
  for (let team of teams) {
    const teamDoc = new Team(team);
    let result = await teamDoc.save();
    savedTeams.push(result);
  }
  return savedTeams;
}
async function seedFixture(teams: Array<any>) {
  const arrOfTeams = await Promise.all(teams);
  for (let index = 0; index < arrOfTeams.length; index += 2) {
    let homeTeam = arrOfTeams[index].name;
    let awayTeam = arrOfTeams[index + 1].name;
    let homeTeamID = arrOfTeams[index]._id;
    let awayTeamID = arrOfTeams[index + 1]._id;
    let stadium = arrOfTeams[index].stadiumName;
    let fixtureDoc = new Fixture({
      homeTeamName: homeTeam,
      awayTeamName: awayTeam,
      referee: 'mark bashir',
      matchDate: '12-9-2020',
      fixtureURL: 'https://sterling-premier-league.herokuapp.com/fixture/',
      awayTeamID,
      homeTeamID,
      stadium,
    });
    await fixtureDoc.save();
  }
}

// seed()
//   .then(data => console.log(data))
//   .catch(error => console.log(error));
//uncomment to seed
