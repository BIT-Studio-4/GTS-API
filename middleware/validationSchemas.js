/**
 * @file Validation schemas for each of the models in the GTS db.
 * @author GTS
 */

import Joi from "joi";

const intLimit = 2147483647;

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
  cost: Joi.number().integer().min(-intLimit).max(intLimit).options({ convert: false }).required().messages({
    "number.base": "Cost must be a number.",
    "number.integer": "Cost must be an integer.",
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
  cost: Joi.number().integer().min(-intLimit).max(intLimit).options({ convert: false }).messages({
    "number.base": "Cost must be a number.",
    "number.integer": "Cost must be an integer.",
    "number.unsafe": "Cost is outside of usable range of numbers.",
    "any.required": "Cost is required.",
  }),
});



const storeObjectSchema = Joi.object({
  item_id: Joi.number().integer().min(-intLimit).max(intLimit).options({ convert: false }).required().messages({
    "number.base": "Item id must be a number.",
    "number.integer": "Item id must be an integer.",
    "number.unsafe": "Item id is outside of the usable range of numbers.",
    "any.required": "Item id is required for each store object.",
  }),
  x_pos: Joi.number().options({ convert: false }).required().messages({
    "number.base": "X pos must be a number.",
    "number.unsafe": "X pos is outside of the usable range of numbers.",
    "any.required": "X pos is required for each store object.",
  }),
  y_pos: Joi.number().options({ convert: false }).required().messages({
    "number.base": "Y pos must be a number.",
    "number.unsafe": "Y pos is outside of the usable range of numbers.",
    "any.required": "Y pos is required for each store object.",
  }),
  z_pos: Joi.number().options({ convert: false }).required().messages({
    "number.base": "Z pos must be a number.",
    "number.unsafe": "Z pos is outside of the usable range of numbers.",
    "any.required": "Z pos is required for each store object.",
  }),
  y_rot: Joi.number().options({ convert: false }).required().messages({
    "number.base": "Y rot must be a number.",
    "number.unsafe": "Y rot is outside of the usable range of numbers.",
    "any.required": "Y rot is required for each store object.",
  }),
});

const storeSchema = Joi.object({
  store_objects: Joi.array().required().items(storeObjectSchema).messages({
    "array.base": "Store objects must be an array.",
    "array.excludes": "Store objects must have only valid object information.",
    "array.includes": "Store objects needs all valid object information.",
    "any.required": "Store objects is required.",
  }),
});

const inventoryItemSchema = Joi.object({
  item_id: Joi.number().integer().min(-intLimit).max(intLimit).required().options({ convert: false }).messages({
    "number.base": "Item id must be a number.",
    "number.unsafe": "Item id is outside of the usable range of numbers.",
    "any.required": "Item id is required for each inventory item.",
  }),
  quantity: Joi.number().integer().min(-intLimit).max(intLimit).options({ convert: false }).required().messages({
    "number.base": "Quantity must be a number.",
    "number.unsafe": "Quantity is outside of the usable range of numbers.",
    "any.required": "Quantity is required for each inventory item.",
  }),
});

const inventorySchema = Joi.object({
  items: Joi.array().required().items(inventoryItemSchema).messages({
    "array.base": "Items must be an array.",
    "array.excludes": "Items must have only valid object information.",
    "array.includes": "Items needs all valid object information.",
    "array.hasUnknown": "Items must have only valid object information.",
    "array.hasKnown": "Items must have only valid object information.",
    "any.required": "Items is required.",
  }),
});

export const createSaveGameSchema = Joi.object({
  id: Joi.string().required().messages({
    "string.base": "Id should be a string.",
    "string.empty": "Id cannot be empty.",
    "any.required": "Id is required.",
  }),
  money: Joi.number().integer().min(-intLimit).max(intLimit).options({ convert: false }).required().messages({
    "number.base": "Money must be a number.",
    "number.integer": "Money must be an integer.",
    "number.unsafe": "Money is outside of the usable range of numbers.",
    "number.max": "Money is larger than usable Integer 32 range.",
    "number.min": "Money is smaller than usable Integer 32 range.",
    "any.required": "Money is required.",
  }),
  store: storeSchema,
  inventory: inventorySchema,
});

// set max number to -int32 +int32
