const Joi = require("joi");
const AppError = require("../utils/AppError.util");

const validationSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().min(8).max(20).required(),
});

const validate = (req, res, next) => {
  const { error } = validationSchema.validate(req.body);
  if (error) {
    return next(new AppError(error.message, 400));
  }
  next();
};

module.exports = validate;
