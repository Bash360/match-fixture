import express from 'express';
import validateUser from '../middleware/validation/user';
import { createUser } from '../controllers/user';

const userRouter = express.Router();

userRouter.post(
  '/signupuser',
  validateUser,
  async (req: express.Request, res: express.Response) => {
    try {
      let { firstName, lastName, email, password, gender } = req.body;
      const userDetails = await createUser(
        firstName,
        lastName,
        email,
        gender,
        password,
      );
      return res
        .header('x-auth-token', userDetails.token)
        .status(200)
        .json(userDetails);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
);
export default userRouter;
