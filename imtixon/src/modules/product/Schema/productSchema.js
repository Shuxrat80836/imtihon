import Joi from "joi";

export const ProductSchema = Joi.object({
  fileId: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
});
