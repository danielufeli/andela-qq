import getSpecificLoan from '../helpers/specificloan';

const checkLoan = (req, res, next) => {
  const loan = getSpecificLoan(Number(req.params.loanid));
  if (!loan) return res.status(404).json({ message: 'The loan application with the given ID was not found' });
  return next();
};

export default checkLoan;
