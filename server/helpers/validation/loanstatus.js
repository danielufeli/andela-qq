import Joi from '@hapi/joi';

const validateLoanStatus = {
  status: Joi.string().min(6).valid('approved', 'rejected').required()
    .error(() => ({ message: 'Status must be set to approved or rejected' })),
};

export default validateLoanStatus;
