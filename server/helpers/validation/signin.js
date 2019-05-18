import Joi from '@hapi/joi';

const validateSignin = {
  email: Joi.string().min(4).max(255).required()
    .email()
    .error(() => ({ message: 'Enter a valid email to signin' })),
  password: Joi.string().min(6).max(255).required()
    .error(() => ({ message: 'Enter a valid password to signin' })),
  isAdmin: Joi.boolean(),
};

export default validateSignin;
