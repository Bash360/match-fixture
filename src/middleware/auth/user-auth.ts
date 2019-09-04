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
function userAuth(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const token: any = req.header('authorization');
  let bearerToken = token.split(' ')[1];

  if (!bearerToken)
    return res.status(401).json('Access denied no token provided');
  try {
    const decoded: any = jwt.verify(bearerToken, secret);

    if (decoded) {
      res.locals.details = decoded;
      return next();
    } else {
      return res.status(403).json('only admin allowed');
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json('invalid token');
  }
}
export default userAuth;