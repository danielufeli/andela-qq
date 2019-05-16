import Joi from '@hapi/joi';

const validateUserStatus = {
  status: Joi.string().min(6).valid('unverified', 'verified').required()
    .error(() => ({ message: 'Status must be set to verified or unverified' })),
};

export default validateUserStatus;
