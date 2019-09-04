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
const updateSchema = {
  headCoach: joi
    .string()
    .trim()
    .lowercase(),
  logo: joi
    .string()
    .trim()
    .lowercase(),
  stadiumName: joi
    .string()
    .trim()
    .lowercase(),
  stadiumAddress: joi
    .string()
    .trim()
    .lowercase(),
  city: joi
    .string()
    .trim()
    .lowercase(),
  stadiumCapacity: joi.number(),
};
function validateTeam(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  if (req.body === {}) return res.status(400).json('pay load cannot be empty');
  const errors = validate(req.body, teamSchema);
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
  if (!Object.keys(req.body).length) return res.status(400).json({});
  let errors = validate(req.body, updateSchema);
  if (errors) {
    return res.status(400).json({ errors });
  }
  return next();
}

export { validateTeam, validateUpdate };
