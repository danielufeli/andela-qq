import Joi from '@hapi/joi';

const validateUserStatus = (user) => {
  const schema = {
    status: Joi.string().min(6).valid('unverified', 'verified').required()
      .error(() => ({ message: 'Status must be set to verified or unverified' })),
  };
  return Joi.validate(user, schema);
};

export default validateUserStatus;
