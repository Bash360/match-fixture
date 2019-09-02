import joi from '@hapi/joi';
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
    .trim()
    .lowercase()
    .email()
    .required(),
  password: joi
    .string()
    .trim()
    .lowercase()
    .required()
    .min(4),
  gender: joi.object().keys({
    type: joi
      .string()
      .valid('male', 'female')
      .trim()
      .lowercase()
      .required(),
  }),
};
