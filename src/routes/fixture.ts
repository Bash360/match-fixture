import express from 'express';
import { createFixture } from '../controllers/fixtures';
import adminAuth from '../middleware/auth/admin-auth';
import { validateFixture } from '../middleware/validation/fixture';

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
export { fixtureRouter };
