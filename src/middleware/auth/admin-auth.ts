import jwt from 'jsonwebtoken';
import express from 'express';
require('dotenv/config');
let secret: string;
if (process.env.SECRET) {
  secret = process.env.SECRET;
} else {
  console.log('environment variable secret not set');
  process.exit(1);
}
function adminAuth(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const token = req.header('authorization');
  if (!token) return res.status(401).json('Acess denied no token provided');
  try {
    const decoded: any = jwt.verify(token, secret);
    if (!decoded.isAdmin) return next();
  } catch (error) {
    return res.status(400).json('invalid token');
  }
}
export default adminAuth;
