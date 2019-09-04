import express from 'express';
import adminAuth from '../middleware/auth/admin-auth';
import { validateTeam, validateUpdate } from '../middleware/validation/team';
import { createTeam, getTeam, updateTeam } from '../controllers/team';
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
// headCoach: joi
//     .string()
//     .trim()
//     .lowercase(),
//   logo: joi
//     .string()
//     .trim()
//     .lowercase(),
//   stadiumName: joi
//     .string()
//     .trim()
//     .lowercase(),
//   stadiumAddress: joi
//     .string()
//     .trim()
//     .lowercase(),
//   city: joi
//     .string()
//     .trim()
//     .lowercase(),
//   stadiumCapacity: joi
//     .number()

export default teamRouter;
