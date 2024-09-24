import { authSchema, createUserSchema, updateUserSchema } from "./validationSchemas.js";

const validateAuth = (req, res, next) => {
  const { error } = authSchema.validate(req.body);

  if (error)
    return res.status(400).json({
      "msg": error.details[0].message,
    });
  
  next();
};

const validateCreateUser = (req, res, next) => {
  const { error } = createUserSchema.validate(req.body);

  if (error)
    return res.status(400).json({
      "msg": error.details[0].message,
    });

  next();
};

const validateUpdateUser = (req, res, next) => {
  const { error } = updateUserSchema.validate(req.body);

  if (error)
    return res.status(400).json({
      "msg": error.details[0].message,
    });

  next();
};

export {
  validateAuth,
  validateCreateUser,
  validateUpdateUser,
};