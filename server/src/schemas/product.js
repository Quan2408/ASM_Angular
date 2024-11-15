import Joi from "joi";

export const productValidate = Joi.object({
  title: Joi.string().trim().min(4).required().messages({
    "any.required": "title là trường bắt buộc",
    "string.empty": "title không được để trống",
    "string.min": "title ít nhất 4 ký tự",
    "string.trim": "title không được có khoảng cách",
  }),
  image: Joi.string().trim().required().messages({
    "any.required": "image là trường bắt buộc",
    "string.empty": "image không được để trống",
    "string.trim": "image không được có khoảng cách",
  }),
  description: Joi.string().trim().required().messages({
    "any.required": "description là trường bắt buộc",
    "string.empty": "description không được để trống",
    "string.trim": "description không được có khoảng cách",
  }),
  price: Joi.number().min(0).required().messages({
    "any.required": "price là trường bắt buộc",
    "number.min": "price phải >= 0 không được âm",
    "number.base": "price phải là số",
  }),
  category: Joi.string().trim().min(1).required().messages({
    "any.required": "category là trường bắt buộc",
    "string.empty": "category không được để trống",
  }),
  isShow: Joi.boolean().required().messages({
    "any.required": "isShow là trường bắt buộc",
    "boolean.base": "isShow phải là kiểu boolean",
  }),
  startAt: Joi.date().allow(null).messages({
    "date.base": "startAt phải là một ngày hợp lệ",
  }),
  endAt: Joi.date().allow(null).messages({
    "date.base": "endAt phải là một ngày hợp lệ",
  }),
  bidTime: Joi.number().min(0).default(0).messages({
    "number.base": "bidTime phải là một số",
    "number.min": "bidTime không được âm",
  }),
});
