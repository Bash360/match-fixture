import express from 'express';
import { validateUser } from '../middleware/validation/user';
import { createAdmin } from '../controllers/user';
const adminRouter = express.Router();
adminRouter.post(
  '/signupadmin',
  validateUser,
  async (req: express.Request, res: express.Response) => {
    try {
      let { firstName, lastName, email, password, gender } = req.body;
      const adminDetails = await createAdmin(
        firstName,
        lastName,
        email,
        gender,
        password,
      );
      return res
        .header('x-auth-token', adminDetails.token)
        .status(200)
        .json(adminDetails);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
);
export default adminRouter;
