import repaymentHistory from '../helpers/repaymenthistory';

const getRepayments = async (req, res, next) => {
  const repayments = await repaymentHistory(Number(req.param.id));
  if (!repayments) return res.status(400).json({ message: 'No Repayment History Found' });
  return next();
};

export default getRepayments;
