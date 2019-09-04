import express from 'express';
import adminAuth from '../middleware/auth/admin-auth';
import { validateTeam, getTeamValidation } from '../middleware/validation/team';
import { createTeam, getTeam } from '../controllers/team';
import userAuth from '../middleware/auth/user-auth';
const teamRouter = express.Router();

teamRouter.post(
  '/addteam',
  [adminAuth, validateTeam],
  async (req: express.Request, res: express.Response) => {
    try {
      const {
        name,
        teamCode,
        logo,
        country,
        city,
        headCoach,
        founded,
        stadiumName,
        stadiumAddress,
        stadiumCapacity,
      } = req.body;
      const teamDetails = await createTeam(
        res.locals.admin.id,
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
      );
      return res.status(200).json(teamDetails);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
);
teamRouter.get(
  '/team/:id',
  userAuth,
  getTeamValidation,
  async (req: express.Request, res: express.Response) => {
    try {
      let { id } = req.params;
      const teamDetails = await getTeam(id);
      return res.status(200).json(teamDetails);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
);

export default teamRouter;
