import Joi from "joi";

export const UserProductSchema = Joi.object({
  userId: Joi.string().required(),
  productId: Joi.string().required(),
  count: Joi.number().required(),
});
export const UserProductUpdateSchema = Joi.object({
  count: Joi.number().required(),
  status: Joi.string().required(),
});
