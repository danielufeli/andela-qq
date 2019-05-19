import loanModel from '../models/loanModel';
import db from '../db';

const getLoanStatus = async (res, req, next) => {
  if (req.user.isadmin === true) return res.status(409).json({ status: 409, message: 'You cannot apply for Loan as an Admin' });
  const { rows } = await db.query(loanModel.getLoanByEmail, [req.user.email]);
  const loan = rows[0];
  if (loan && loan.status === 'pending') return res.status(409).json({ status: 409, message: `You have a ${loan.status} loan with us` });
  if (loan && loan.status === 'approved' && loan.repaid === false) return res.status(409).json({ status: 409, message: 'Your loan is yet to be repaid' });
  return next();
};

export default getLoanStatus;
