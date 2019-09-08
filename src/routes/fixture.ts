import express from 'express';
import {
  createFixture,
  getFixture,
  getAllFixtures,
  updateFixture,
  endGame,
  removeFixture,
  getFixtureByTeamName,
} from '../controllers/fixtures';
import adminAuth from '../middleware/auth/admin-auth';
import {
  validateFixture,
  validateUpdate,
  validateSearch,
} from '../middleware/validation/fixture';
import { userAuth, limitAPI } from '../middleware/auth/user-auth';
const fixtureRouter = express.Router();

fixtureRouter.post(
  '/fixture/add',
  [adminAuth, validateFixture],
  async (req: express.Request, res: express.Response) => {
    try {
      const { homeTeamName, awayTeamName, referee, matchDate } = req.body;
      const url = `${req.protocol}://${req.hostname}/fixture/`;
      const fixtureDetails = await createFixture(
        res.locals.admin.id,
        homeTeamName,
        awayTeamName,
        referee,
        matchDate,
        url,
      );
      return res.status(200).json({ success: true, data: fixtureDetails });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
);
fixtureRouter.get(
  '/fixture/all',
  [userAuth, limitAPI],
  async (_req: express.Request, res: express.Response) => {
    try {
      const allFixtures = await getAllFixtures();
      return res.status(200).json({ success: true, data: allFixtures });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
);
fixtureRouter.get(
  '/fixture/search?',
  validateSearch,
  async (req: express.Request, res: express.Response) => {
    try {
      const teamName = req.query.name;
      const fixtureDetails = await getFixtureByTeamName(teamName);
      return res.status(200).json({ success: true, data: fixtureDetails });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
);
fixtureRouter.get(
  '/fixture/:id',
  [userAuth, limitAPI],
  async (req: express.Request, res: express.Response) => {
    try {
      const fixtureId = req.params.id;
      const fixtureDetails = await getFixture(fixtureId);
      return res.status(200).json({ success: true, data: fixtureDetails });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
);
fixtureRouter.put(
  '/fixture/update/:id',
  [adminAuth, validateUpdate],
  async (req: express.Request, res: express.Response) => {
    try {
      const fixtureId = req.params.id;
      const fixtureDetails = await updateFixture(
        res.locals.admin.id,
        fixtureId,
        req.body,
      );
      return res.status(200).json({ success: true, data: fixtureDetails });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
);
fixtureRouter.put(
  '/fixture/endgame/:id',
  adminAuth,
  async (req: express.Request, res: express.Response) => {
    try {
      const fixtureId = req.params.id;
      const fixtureDetails = await endGame(res.locals.admin.id, fixtureId);
      return res.status(200).json({ success: true, data: fixtureDetails });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
);
fixtureRouter.delete(
  '/fixture/remove/:id',
  adminAuth,
  async (req: express.Request, res: express.Response) => {
    try {
      const fixtureId = req.params.id;
      const fixtureDetails = await removeFixture(
        res.locals.admin.id,
        fixtureId,
      );
      return res.status(200).json({ success: true, data: fixtureDetails });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
);

export default fixtureRouter;
