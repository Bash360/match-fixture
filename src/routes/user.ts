import express from 'express';
import { validateUser, validateLogin } from '../middleware/validation/user';
import { createUser, loginUser } from '../controllers/user';

const userRouter = express.Router();

userRouter.post('/user/signup', validateUser, async (req: any, res: any) => {
  try {
    let { firstName, lastName, email, password, gender } = req.body;
    const userDetails = await createUser(
      firstName,
      lastName,
      email,
      gender,
      password,
    );
    if (req.sessionID) {
      req.session.userDetails = userDetails;
    }
    return res
      .header('authorization', userDetails.token)
      .status(200)
      .json({ success: true, data: userDetails });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});
userRouter.post(
  '/user/login',
  validateLogin,
  async (req: any, res: express.Response) => {
    try {
      const { email, password } = req.body;
      const user = req.session.hasOwnProperty('userDetails');
      if (req.sessionID && email === user.email) {
        const userDetails = req.session.userDetails;
        return res
          .header('authorization', userDetails.token)
          .status(200)
          .json({ success: true, data: userDetails });
      }

      const userDetails = await loginUser(email, password);
      if (req.sessionID) {
        req.session.userDetails = userDetails;
      }

      return res
        .header('authorization', userDetails.token)
        .status(200)
        .json({ success: true, data: userDetails });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
);
export default userRouter;
