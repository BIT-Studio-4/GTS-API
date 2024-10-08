/**
 * @file Validation schemas for each of the models in the GTS db.
 * @author GTS
 */

import Joi from "joi";

const nameRegex = /^[A-Za-z0-9_!@#\$%\^&\*\(\)\-\?]+$/;

export const authSchema = Joi.object({
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
  money: Joi.number().required().messages({
    "number.base": "Money must be a number.",
    "number.unsafe": "Money is outside of usable range of numbers.",
    "any.required": "Money is required.",
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
  money: Joi.number().required().messages({
    "number.base": "Money must be a number.",
    "number.unsafe": "Money is outside of usable range of numbers.",
    "any.required": "Money is required.",
  }),
});