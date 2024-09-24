import { userSchema } from "./validationSchemas";

const validateMutateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);

  if (error)
    return res.status(400).json({
      "msg": error.details[0].message,
    });

  next();
};