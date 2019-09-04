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
const updateSchema = {
  goalsHomeTeam: joi.number,
  goalsAwayTeam: joi.number,
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
function validateUpdate(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  if (!Object.keys(req.body).length) {
    return res.status(400).json('must update one field at least');
  }
  const errors = validate(updateSchema, req.body);
  if (errors) {
    return res.status(400).json({ errors });
  }
  return next();
}
export { validateFixture, validateUpdate };
