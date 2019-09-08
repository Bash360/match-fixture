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
function userAuth(req: any, res: express.Response, next: express.NextFunction) {
  const token: any = req.header('authorization');
  if (!token)
    return res.status(401).json('Access denied must be a registered user');
  try {
    let bearerToken = token.split(' ')[1];
    const decoded: any = jwt.verify(bearerToken, secret);

    if (decoded) {
      res.locals.details = decoded;
      return next();
    } else {
      return res.status(403).json('only admin allowed');
    }
  } catch (error) {
    return res.status(400).json('invalid token');
  }
}
function limitAPI(req: any, res: express.Response, next: express.NextFunction) {
  const limit = req.session.hasOwnProperty('limit')
    ? (req.session.limit += 1)
    : 0;
  if (limit >= 5)
    return res.status(429).json({
      message: 'Too Many Requests you have exceeded the limit for API call',
    });
  return next();
}
export { userAuth, limitAPI };
