import express from 'express';
import { validateUser, validateLogin } from '../middleware/validation/user';
import { createAdmin, loginUser } from '../controllers/user';

const adminRouter = express.Router();
adminRouter.post('/admin/signup', validateUser, async (req: any, res: any) => {
  try {
    let { firstName, lastName, email, password, gender } = req.body;

    const adminDetails = await createAdmin(
      firstName,
      lastName,
      email,
      gender,
      password,
    );
    if (req.sessionID) {
      req.session.adminDetails = adminDetails;
    }
    return res
      .header('authorization', adminDetails.token)
      .status(200)
      .json({ success: true, data: adminDetails });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});
adminRouter.post('/admin/login', validateLogin, async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    const adminEmail = req.session.hasOwnProperty('adminDetails')
      ? req.session.adminDetails.mail
      : null;
    if (req.sessionID && email === adminEmail) {
      const adminDetails = req.session.adminDetails;
      return res
        .header('authorization', adminDetails.token)
        .status(200)
        .json({ success: true, data: adminDetails });
    }
    const adminDetails = await loginUser(email, password);
    if (req.sessionID) {
      req.session.adminDetails = adminDetails;
    }
    return res
      .header('authorization', adminDetails.token)
      .status(200)
      .json({ success: true, data: adminDetails });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
});
export default adminRouter;
