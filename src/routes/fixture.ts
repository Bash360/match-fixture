import express from 'express';
import {
  createFixture,
  getFixture,
  getAllFixtures,
} from '../controllers/fixtures';
import adminAuth from '../middleware/auth/admin-auth';
import { validateFixture } from '../middleware/validation/fixture';
import userAuth from '../middleware/auth/user-auth';
const fixtureRouter = express.Router();

fixtureRouter.post(
  '/fixture/add',
  [adminAuth, validateFixture],
  async (req: express.Request, res: express.Response) => {
    try {
      const { homeTeamName, awayTeamName, referee, matchDate } = req.body;
      const url = `${req.protocol}://${req.hostname}:${req.app.settings.port}/api/v1/fixture/`;
      const fixtureDetails = await createFixture(
        res.locals.admin.id,
        homeTeamName,
        awayTeamName,
        referee,
        matchDate,
        url,
      );
      return res.status(200).json(fixtureDetails);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
);
fixtureRouter.get(
  '/fixture/all',
  userAuth,
  async (_req: express.Request, res: express.Response) => {
    try {
      const allFixtures = await getAllFixtures();
      return res.status(200).json(allFixtures);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
);
fixtureRouter.get(
  '/fixture/:id',
  userAuth,
  async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      const fixtureDetails = await getFixture(id);
      return res.status(200).json(fixtureDetails);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
);

export default fixtureRouter;
