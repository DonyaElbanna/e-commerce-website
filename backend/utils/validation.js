const Joi = require("joi");

const validationSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().min(8).max(20).required(),
});

const validate = (req, res, next) => {
  const { error } = validationSchema.validate(req.body);
  if (error) {
    const validationError = new Error(error.message);
    validationError.status = 400;
    return next(validationError);
  }
  next();
};

module.exports = validate;
