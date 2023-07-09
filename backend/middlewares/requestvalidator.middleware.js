const Joi = require("joi");
exports.RequestValidator = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      const err = new Error(error.details[0].message);
      err.status = 422;
      next(err);
    }
  };
};
exports.Schemas = {
  user: {
    create: Joi.object({
      userName: Joi.string().required(),
      emailAddress: Joi.string().required(),
      password: Joi.string().required(),
      confirmPassword: Joi.string().required(),
    }),
    wishListAdd: Joi.object({
      id: Joi.string().required(),
      Attraction: Joi.string().required(),
    }),
  },
  auth: {
    signin: Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
    sendVerification: Joi.object({
      emailAddress: Joi.string().required(),
      type: Joi.string().valid("verify", "reset").required(),
    }),
    forgetpassword: Joi.object({
      emailAddress: Joi.string().required(),
    }),
    confirmAndModifyPassword: Joi.object({
      token: Joi.string().required(),
      password: Joi.string().required(),
    }),
  },
  category: {
    create: Joi.object({
      name: Joi.string().required(),
      image: Joi.string().required(),
      image_key: Joi.string().optional(),
    }),
    edit: Joi.object({
      name: Joi.string().required(),
      image: Joi.string().optional(),
      image_key: Joi.string().optional(),
    }),
  },
};
exports.QueryValidator = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.query);
      next();
    } catch (error) {
      const err = new Error(error.details[0].message);
      err.status = 422;
      next(err);
    }
  };
};
