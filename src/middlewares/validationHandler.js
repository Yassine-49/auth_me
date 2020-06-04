const Joi = require('@hapi/joi');

module.exports = {
  // Joi validation
  validateBody: (schema) => (req, res, next) => {
    // validate the request
    const result = schema.validate(req.body);
    // if validation failed return error
    if (result.error) {
      return res.status(400).json(result.error);
    }
    // check if request has object called valid already, if not create it
    if (!req.valid) req.valid = {};
    // insert the validated body in the new object
    req.valid.body = result.value;
    return next();
  },
  // Joi validation schemas
  schemas: {
    // register schema
    register: Joi.object({
      email: Joi.string()
        .email()
        .max(254)
        .required(),
      username: Joi.string()
        .alphanum()
        .required(),
      password: Joi.string()
        .min(8)
        .required(),
    }),
    // login schema
    login: Joi.object({
      username: Joi.string()
        .alphanum()
        .required(),
      password: Joi.string()
        .min(8)
        .required(),
    }),
  },
};
