import joi from '@hapi/joi';
import validate from './validate';
import express from 'express';
const teamSchema = {
  name: joi
    .string()
    .lowercase()
    .required()
    .trim(),
  teamCode: joi
    .string()
    .lowercase()
    .required()
    .trim(),
  logo: joi
    .string()
    .lowercase()
    .required()
    .trim(),
  country: joi
    .string()
    .lowercase()
    .required()
    .trim(),
  city: joi
    .string()
    .lowercase()
    .required()
    .trim(),
  headCoach: joi
    .string()
    .lowercase()
    .required()
    .trim(),
  founded: joi
    .string()
    .lowercase()
    .required()
    .trim(),
  stadiumName: joi
    .string()
    .lowercase()
    .required()
    .trim(),
  stadiumAddress: joi
    .string()
    .lowercase()
    .required()
    .trim(),
  stadiumCapacity: joi.number().required(),
};
function validateTeam(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const errors = validate(req.body, teamSchema);
  if (errors) {
    return res.status(400).json({ errors });
  }
  return next();
}
export { validateTeam };
