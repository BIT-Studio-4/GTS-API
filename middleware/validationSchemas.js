/**
 * @file Validation schemas for each of the models in the GTS db.
 * @author GTS
 */

import Joi from "joi";

const nameRegex = /^[A-Za-z0-9_!@#\$%\^&\*\(\)\-\?]+$/;

export const createUserSchema = Joi.object({
  name: Joi.string().min(1).max(25).regex(nameRegex).required().messages({
    "string.base": "Name should be a string.",
    "string.pattern.base": "Name can only consist of Alphanumeric and '!@#$%^&*()_-?' characters.",
    "string.empty": "Name cannot be empty.",
    "string.min": "Name should have a minimum length of {#limit}.",
    "string.max": "Name should have a maximum length of {#limit}.",
    "any.required": "Name is required.",
  }),
  password: Joi.string().min(8).max(128).required().messages({
    "string.base": "Password should be a string.",
    "string.empty": "Password cannot be empty.",
    "string.min": "Password should have a minimum length of {#limit}.",
    "string.max": "Password should have a maximum length of {#limit}.",
    "any.required": "Password is required.",
  }),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().min(1).max(25).regex(nameRegex).required().messages({
    "string.base": "Name should be a string.",
    "string.pattern.base": "Name can only consist of Alphanumeric and '!@#$%^&*()_-?' characters.",
    "string.empty": "Name cannot be empty.",
    "string.min": "Name should have a minimum length of {#limit}.",
    "string.max": "Name should have a maximum length of {#limit}.",
    "any.required": "Name is required.",
  }),
  password: Joi.string().min(8).max(128).messages({
    "string.base": "Password should be a string.",
    "string.empty": "Password cannot be empty.",
    "string.min": "Password should have a minimum length of {#limit}.",
    "string.max": "Password should have a maximum length of {#limit}.",
  }),
});

const itemRegex = /^[A-Za-z0-9_\(\)]+$/;
const itemTypeRegex = /^[A-Z]+$/;

export const createItemSchema = Joi.object({
  name: Joi.string().min(1).max(25).regex(itemRegex).required().messages({
    "string.base": "Name should be a string.",
    "string.pattern.base": "Name can only consist of Alphanumeric and '!@#$%^&*()_-?' characters.",
    "string.empty": "Name cannot be empty.",
    "string.min": "Name should have a minimum length of {#limit}.",
    "string.max": "Name should have a maximum length of {#limit}.",
    "any.required": "Name is required.",
  }),
  item_type: Joi.string().regex(itemTypeRegex).required().messages({
    "string.base": "Item type should be a string.",
    "string.pattern.base": "Item type can only consist of captial letters.",
    "string.empty": "Item type cannot be empty.",
    "any.required": "Item type is required.",
  }),
  cost: Joi.number().required().messages({
    "number.base": "Cost must be a number.",
    "number.unsafe": "Cost is outside of usable range of numbers.",
    "any.required": "Cost is required.",
  }),
});

export const updateItemSchema = Joi.object({
  name: Joi.string().min(1).max(25).regex(itemRegex).messages({
    "string.base": "Name should be a string.",
    "string.pattern.base": "Name can only consist of Alphanumeric and '!@#$%^&*()_-?' characters.",
    "string.empty": "Name cannot be empty.",
    "string.min": "Name should have a minimum length of {#limit}.",
    "string.max": "Name should have a maximum length of {#limit}.",
    "any.required": "Name is required.",
  }),
  item_type: Joi.string().regex(itemTypeRegex).messages({
    "string.base": "Item type should be a string.",
    "string.pattern.base": "Item type can only consist of captial letters.",
    "string.empty": "Item type cannot be empty.",
    "any.required": "Item type is required.",
  }),
  cost: Joi.number().messages({
    "number.base": "Cost must be a number.",
    "number.unsafe": "Cost is outside of usable range of numbers.",
    "any.required": "Cost is required.",
  }),
});