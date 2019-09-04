import joi from '@hapi/joi';
import validate from './validate';
import express from 'express';
const fixtureSchema = {
  homeTeamName: joi
    .string()
    .trim()
    .lowercase()
    .required(),
  awayTeamName: joi
    .string()
    .trim()
    .lowercase()
    .required(),
  referee: joi
    .string()
    .trim()
    .lowercase()
    .required(),
  matchDate: joi
    .string()
    .trim()
    .lowercase()
    .required(),
};
function validateFixture(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const errors = validate(req.body, fixtureSchema);
  if (errors) {
    return res.status(400).json({ errors });
  }
  return next();
}
export { validateFixture };
