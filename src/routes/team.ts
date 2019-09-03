import express from 'express';
import adminAuth from '../middleware/auth/admin-auth';
import { validateTeam } from '../middleware/validation/team';
const teamRouter = express.Router();

teamRouter.post(
  '/addteam',
  [adminAuth, validateTeam],
  async (req: express.Request, res: express.Response) => {
    try {
    } catch (error) {}
  },
);

export default teamRouter;
