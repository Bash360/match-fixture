import express from 'express';
import validateUser from '../middleware/validation/user';
import { createUser } from '../controllers/user';
const userRouter = express.Router();

userRouter.post(
  '/signupuser',
  validateUser,
  (req: express.Request, res: express.Response) => {
    const { firstName, lastName, email, password, gender } = req.body;
    createUser(firstName, lastName, email, password, gender)
      .then(userDetails => res.status(200).json(userDetails))
      .catch(error => res.status(400).json(error));
  },
);
export default userRouter;
