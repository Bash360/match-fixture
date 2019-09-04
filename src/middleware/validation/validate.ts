import joi from '@hapi/joi';
const validate = (body: any, schema: any): any => {
  let { error } = joi.validate(body, schema, { abortEarly: false });
  if (!error) return false;
  let errors = error.details.reduce((totalErrors: string, error: any) => {
    return `${totalErrors} ${error.message.replace(/\"/g, '')} `;
  }, ' ');
  return errors;
};
export default validate;
