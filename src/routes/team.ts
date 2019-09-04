import express from 'express';
import adminAuth from '../middleware/auth/admin-auth';
import { validateTeam, validateUpdate } from '../middleware/validation/team';
import {
  createTeam,
  getTeam,
  updateTeam,
  removeTeam,
} from '../controllers/team';
import userAuth from '../middleware/auth/user-auth';
const teamRouter = express.Router();

teamRouter.post(
  '/team/add',
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
teamRouter.put(
  '/team/update/:id',
  adminAuth,
  validateUpdate,
  async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      const teamDetails = await updateTeam(res.locals.admin.id, id, {
        ...req.body,
      });
      return res.status(200).json(teamDetails);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
);
teamRouter.delete(
  '/team/delete/:id',
  adminAuth,
  async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      const message = await removeTeam(res.locals.admin.id, id);
      return res.status(200).json({ message });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
);
export default teamRouter;
