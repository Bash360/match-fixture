import joi from '@hapi/joi';
import validate from './validate';
import express from 'express';
const userSchema = {
  firstName: joi
    .string()
    .trim()
    .min(3)
    .required(),
  lastName: joi
    .string()
    .trim()
    .lowercase()
    .min(3)
    .required(),
  email: joi
    .string()
    .email()
    .trim()
    .lowercase()
    .required(),
  password: joi
    .string()
    .trim()
    .lowercase()
    .required()
    .min(4),
  gender: joi
    .string()
    .valid('male', 'female')
    .trim()
    .lowercase()
    .required(),
};
const loginSchema = {
  email: joi
    .string()
    .email()
    .trim()
    .lowercase()
    .required(),
  password: joi
    .string()
    .trim()
    .lowercase()
    .required()
    .min(4),
};
function validateUser(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  console.log(
    `${req.protocol}://${req.hostname}:${req.app.settings.port}${req.originalUrl}`,
  );
  const errors: any = validate(req.body, userSchema);

  if (errors) {
    return res.status(400).json({ errors });
  }
  return next();
}
function validateLogin(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const errors: any = validate(req.body, loginSchema);

  if (errors) {
    return res.status(400).json({ errors });
  }
  return next();
}
export { validateUser, validateLogin };
