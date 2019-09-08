import { getFixture } from '../controllers/fixtures';
import express from 'express';
import { userAuth, limitAPI } from '../middleware/auth/user-auth';
const uniqueRouter = express.Router();
uniqueRouter.get(
  '/:id',
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
export default uniqueRouter;
