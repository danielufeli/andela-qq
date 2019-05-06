import Joi from '@hapi/joi';

const validateLoanStatus = (loan) => {
  const schema = {
    status: Joi.string().min(6).valid('approved', 'rejected').required()
      .error(() => ({ message: 'Status must be set to approved or rejected' })),
  };
  return Joi.validate(loan, schema);
};

export default validateLoanStatus;
