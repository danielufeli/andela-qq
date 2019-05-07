import Joi from '@hapi/joi';

const validateAmount = (repayment) => {
  const schema = {
    paidAmount: Joi.number().min(2).required()
      .error(() => ({ message: 'Enter Valid Amount Paid e.g. 10000' })),
  };
  return Joi.validate(repayment, schema);
};

export default validateAmount;
