import Joi from '@hapi/joi';

const validateLoan = (loan) => {
  const schema = {
    amount: Joi.number().min(2).required()
      .error(() => ({ message: 'Enter Loan amount' })),
    tenor: Joi.number().integer().min(1).max(12)
      .required()
      .error(() => ({ message: 'Enter how many months you need to pay back' })),
  };
  return Joi.validate(loan, schema);
};

export default validateLoan;
