import Joi from '@hapi/joi';

const validateSignin = (user) => {
  const schema = {
    email: Joi.string().min(4).max(255).required()
      .email(),
    password: Joi.string().min(6).max(255).required(),
    isAdmin: Joi.boolean(),
  };
  return Joi.validate(user, schema);
};

export default validateSignin;
