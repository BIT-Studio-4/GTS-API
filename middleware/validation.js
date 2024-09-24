import { authSchema, userSchema } from "./validationSchemas";

const validateAuth = (req, res, next) => {
  const { error } = authSchema.validate(req.body);

  if (error)
    return res.status(400).json({
      "msg": error.details[0].message,
    });
  
  next();
};

const validateMutateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);

  if (error)
    return res.status(400).json({
      "msg": error.details[0].message,
    });

  next();
};

export {
  validateAuth,
  validateMutateUser,
};