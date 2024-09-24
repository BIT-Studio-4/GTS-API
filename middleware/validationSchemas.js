/**
 * @file Validation schemas for each of the models in the GTS db.
 * @author GTS
 */

import Joi from "joi";

export const authSchema = Joi.object({
  name: Joi.string().min(1).max(25).regex(/[A-Za-z0-9_-!@#$%^&*()?]/).required(),
  password: Joi.string().min(8).max(128).required(),
});

export const userSchema = Joi.object({
  name: Joi.string().min(1).max(25).regex(/[A-Za-z0-9_-!@#$%^&*()?]/).required(),
  password: Joi.string().min(8).max(128).required(),
  money: Joi.number().required(),
});