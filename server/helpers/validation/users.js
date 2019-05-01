import Joi from '@hapi/joi';

const validateUser = (user) => {
  const schema = {
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    password: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(4).max(255).required()
      .email(),
    address: Joi.string().min(6).required(),
    status: Joi.string().min(6),
    mobileno: Joi.number().min(10).required(),
    isAdmin: Joi.boolean(),
  };
  return Joi.validate(user, schema);
};

export default validateUser;
