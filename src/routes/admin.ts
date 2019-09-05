import express from 'express';
import { validateUser, validateLogin } from '../middleware/validation/user';
import { createAdmin, loginUser } from '../controllers/user';

const adminRouter = express.Router();
adminRouter.post(
  '/admin/signup',
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
        .header('authorization', adminDetails.token)
        .status(200)
        .json(adminDetails);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
);
adminRouter.post(
  '/admin/login',
  validateLogin,
  async (req: express.Request, res: express.Response) => {
    try {
      const { email, password } = req.body;
      const adminDetails = await loginUser(email, password);
      return res
        .header('authorization', adminDetails.token)
        .status(200)
        .json(adminDetails);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  },
);
export default adminRouter;
