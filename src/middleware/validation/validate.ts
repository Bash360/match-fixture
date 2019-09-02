import joi from '@hapi/joi';
const validate = (reqBody: any, schema: any) => {
  let { error } = joi.validate(reqBody, schema, { abortEarly: false });
  if (error) {
    let errors = error.details.reduce((totalErrors, error) => {
      return `${totalErrors} ${error.message.replace(/\"/g, '')} `;
    }, ' ');
    return errors;
  }
  return false;
};
export default validate;
