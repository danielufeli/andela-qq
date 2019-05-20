import Joi from '@hapi/joi';

const validateAmount = {
  paidamount: Joi.number().min(2).required()
    .error(() => ({ message: 'Enter Valid Amount Paid e.g. 10000' })),
};

export default validateAmount;
