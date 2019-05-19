import loanObjects from './loanObjects';

const checkLoan = (req, res, next) => {
  const loan = loanObjects.getSingleLoan(req);
  if (!loan) return res.status(404).json({ status: 404, message: 'The loan application with the given ID was not found' });
  return next();
};

export default checkLoan;
