import Joi from '@hapi/joi';

const validateLoan = {
  amount: Joi.number().min(2).required()
    .error(() => ({ message: 'Enter Loan amount' })),
  tenor: Joi.number().integer().min(1).max(12)
    .required()
    .error(() => ({ message: 'Enter how many months you need to pay back' })),
};

export default validateLoan;
