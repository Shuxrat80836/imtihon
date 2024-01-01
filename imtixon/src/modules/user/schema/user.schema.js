import Joi from "joi";

export const UserSchema = Joi.object({
  phone: Joi.number().min(9).required(),
  password: Joi.string().min(4).max(12).required(),
  fullName: Joi.string().required(),
});

export const UserLoginSchema = Joi.object({
  phone: Joi.number().required(),
  password: Joi.string().min(4).max(12).required(),
});
